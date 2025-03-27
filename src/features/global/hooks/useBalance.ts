import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import {
  BUNCH_SIZE,
  EARNED_AMOUNT_CHECK_TICK,
  METHODS_LABELS,
} from '@global/constants';
import useContracts from '@global/hooks/useContracts';
import useMetamask from '@global/hooks/useMetamask';
import {
  CONTRACT_METHODS,
  METAMASK_EVENTS,
  TOASTS_APPEARANCE,
} from '@global/types';

import {
  isCollectingSelector,
  isLoadingTokensSelector,
} from '@redux/selectors/commonAppSelectors';
import Ethereum from '@root/api/etheriumWeb3';
import { NETWORK_DATA } from '@root/settings';
import { CURRENT_CHAIN } from '@root/settings/chains';
import {
  addressSelector,
  clnyBalanceSelector,
  earnedAmountSelector,
  earnSpeedSelector,
  mintedTokensSelector,
  tokensSelector,
  userBalanceSelector,
} from '@selectors/userStatsSelectors';
import {
  setGameManager,
  setInitialized,
  setIsCollecting,
  setIsLoading,
} from '@slices/commonAppStateSlice';
import {
  resetMintedTokens,
  setAddress,
  setColonyBalance,
  setEarnedAmount,
  setEarnSpeed,
  setMintedTokens,
  setUserBalance,
  setUserTokens,
} from '@slices/userStatsSlice';
import Web3 from 'web3';
import { fromWei } from 'web3-utils';

export const useBalance = () => {
  const { makeRequest, makeSendRequest } = useMetamask();
  const {
    getCLNYManager,
    clnyManager,
    gameManager,
    getGameManager,
    getMCManager,
  } = useContracts();

  // BALANCE ITEMS
  const clnyBalance = useSelector(clnyBalanceSelector);
  const userBalance = useSelector(userBalanceSelector);
  const plotTokens = useSelector(tokensSelector);
  const tokens = useSelector(tokensSelector);
  const isLoadingTokens = useSelector(isLoadingTokensSelector);

  const earnedAmount = useSelector(earnedAmountSelector);
  const speed = useSelector(earnSpeedSelector);

  // GLOBAL BALANCE
  const allMintedTokens = useSelector(mintedTokensSelector);

  // APP PARTS
  const userAddress = useSelector(addressSelector);
  const isCollectInProgress = useSelector(isCollectingSelector);

  // UTILS
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const softTimer = React.useRef<NodeJS.Timeout>();

  const updateCLNYBalance = React.useCallback(
    async (address) => {
      makeRequest({
        type: METAMASK_EVENTS.call,
        address,
        method: CONTRACT_METHODS.balanceOf,
        params: [address],
        contract: clnyManager ?? getCLNYManager(),
        onSuccess: (balance) => {
          if (balance !== undefined) {
            const _clnyBalance = +fromWei(balance, 'ether');
            if (clnyBalance !== _clnyBalance) {
              dispatch(setColonyBalance(_clnyBalance));
            }
          }
        },
      });
    },
    [dispatch, clnyBalance, clnyManager]
  );

  const updateEarnedAll = React.useCallback(async () => {
    if (!gameManager) return;
    const allTokens = Array.from(plotTokens ?? []).flat();

    let bunch: string[] = [];
    let earnedAmount = 0;
    let earnSpeed = 0;
    for (let i = 0; i < allTokens.length; i++) {
      bunch.push(allTokens[i]);
      if (bunch.length >= 50 || i === allTokens.length - 1) {
        await makeRequest({
          type: METAMASK_EVENTS.call,
          address: userAddress,
          method: CONTRACT_METHODS.getEarningData,
          params: [bunch],
          contract: gameManager,
          // eslint-disable-next-line no-loop-func
          onSuccess: (earningData) => {
            if (earningData) {
              const { '0': earned, '1': speed } = earningData;
              earnedAmount = earnedAmount + parseInt(earned) * 1e-18;
              earnSpeed = earnSpeed + parseInt(speed);
            }
          },
        });
        bunch = [];
      }
    }
    dispatch(setEarnedAmount(earnedAmount));
    dispatch(setEarnSpeed(earnSpeed));
  }, [plotTokens, dispatch, gameManager]);

  const fetchUserBalance = React.useCallback(
    async (address, web3Instance) => {
      await updateCLNYBalance(address);
      await updateEarnedAll();
      let _balance: number;
      try {
        _balance = +fromWei(
          await web3Instance.eth.getBalance(address),
          'ether'
        );
      } catch {
        _balance = 0;
      }

      if (userBalance !== _balance) {
        dispatch(setUserBalance(_balance));
        dispatch(setInitialized(true));
      }
    },
    [userBalance]
  );

  const claimToken = React.useCallback(
    async (tokenNumbers: number[], address: string, web3Instance: Web3) => {
      for (const tokenNumber of tokenNumbers) {
        if (Number.isNaN(tokenNumber)) return;
        const tokenId: string = tokenNumber.toString();
        if (tokenId === null) return;
      }

      let txHash: string | null = null;

      const feeValue = await makeRequest({
        method: CONTRACT_METHODS.getFee,
        params: [tokenNumbers.length],
        address,
        type: METAMASK_EVENTS.call,
        contract: gameManager ?? getGameManager(),
      });

      makeRequest({
        type: METAMASK_EVENTS.send,
        method: CONTRACT_METHODS.claim,
        contract: gameManager ?? getGameManager(),
        params: [tokenNumbers],
        onLoad: (hash: string) => {
          txHash = hash;

          window.view?.popup?.close?.();
          window.ogPopup?.setVisibility?.(false);
          fetchUserBalance(address, web3Instance);
        },
        onSuccess: () => {
          fetchUserBalance(address, web3Instance);

          if (tokens !== null)
            dispatch(setUserTokens([tokenNumbers.toString()]));
          if (allMintedTokens !== null)
            dispatch(setMintedTokens(tokenNumbers.toString()));

          // @ts-ignore
          window.openLinksPopup();
        },
        onError: () => {},
        transactionOptions: {
          value: feeValue,
          type: CURRENT_CHAIN.x2,
        },
        address,
        eventName: METHODS_LABELS.landClaim,
      });
    },
    [gameManager, tokens, allMintedTokens, dispatch]
  );

  const collectAllStats = React.useCallback(
    async (address, web3Instance) => {
      const partialCollect = async (
        bunch: any[],
        part: number,
        partsCount: number
      ): Promise<void> => {
        return new Promise((rs) => {
          makeRequest({
            address,
            contract: gameManager ?? getGameManager(),
            method: CONTRACT_METHODS.claimEarned,
            params: [bunch],
            transactionOptions: { type: CURRENT_CHAIN.x2 },
            onLoad: (hash) => {
              rs();
            },
            onSuccess: () => {
              rs();

              if (part === partsCount) {
                fetchUserBalance(address, web3Instance);
                dispatch(setIsCollecting(false));
              }
            },
            onError: () => {
              rs();

              if (part === partsCount) {
                fetchUserBalance(address, web3Instance);
                dispatch(setIsCollecting(false));
              }
            },
            type: METAMASK_EVENTS.send,
            eventName: METHODS_LABELS.partialClaim(part, partsCount),
          });
        });
      };

      try {
        dispatch(setIsCollecting(true));
        const allTokens = Array.from(tokens ?? []);
        const bunchCount = Math.ceil(allTokens.length / BUNCH_SIZE);
        let bunch = [];
        let bunchNumber = 1;
        for (let k = 0; k < allTokens.length; k++) {
          bunch.push(allTokens[k]);
          if (bunch.length >= BUNCH_SIZE) {
            await partialCollect([...bunch], bunchNumber++, bunchCount);
            bunch = [];
          }
        }
        if (bunch.length > 0) {
          await partialCollect([...bunch], bunchNumber++, bunchCount);
        }

        await fetchUserBalance(address, web3Instance);
      } catch (error) {
        addToast(`${NETWORK_DATA.TOKEN_NAME} collecting error!`, {
          appearance: TOASTS_APPEARANCE.error,
        });
      }
    },
    [dispatch, fetchUserBalance, gameManager, setGameManager, tokens]
  );

  const getAccountAssets = React.useCallback(
    async (addressRef, web3Instance) => {
      if (!web3Instance) return;
      try {
        const accounts = await web3Instance!.eth.getAccounts();
        const _address = accounts[0];

        if (_address !== address) {
          addressRef.current = _address;
          dispatch(setAddress(_address));
          window.address = _address;
        }

        await fetchUserBalance(addressRef.current, web3Instance);

        let _contract;

        if (!_contract) {
          _contract = getMCManager();
          _contract.events.Transfer({ fromBlock: 'latest' }, function () {});
        }

        const isStatsEmpty =
          tokens === null && allMintedTokens === null && !isLoadingTokens;
        if (isStatsEmpty) {
          makeRequest({
            method: CONTRACT_METHODS.allMyTokens,
            address: addressRef.current,
            errorText: 'Error getting owned tokens list',
            type: METAMASK_EVENTS.call,
            contract: _contract,
            onSuccess: async (_tokens) => {
              const allData = await Ethereum.getTokens();
              dispatch(setUserTokens(_tokens));
              dispatch(resetMintedTokens(allData));
              dispatch(setInitialized(true));
              dispatch(setIsLoading({ field: 'tokensLoading', value: false }));
            },
          });
        }
      } catch (err) {}
    },
    [dispatch, tokens, allMintedTokens, isLoadingTokens]
  );
  useEffect(() => {
    Ethereum.getTokens().then((allData) => {
      dispatch(resetMintedTokens(allData));
      dispatch(setInitialized(true));
      dispatch(setIsLoading({ field: 'tokensLoading', value: false }));
    });
  }, []);

  React.useEffect(() => {
    if (speed === 0) return;
    if (softTimer.current) {
      clearInterval(softTimer.current);
    }

    if (
      NETWORK_DATA.ECONOMY === 'fixed' &&
      import.meta.env.VITE_BALANCE_CHECK_AVAILABLE
    ) {
      softTimer.current = setInterval(() => {
        dispatch(setEarnedAmount(earnedAmount + 0.01));
      }, EARNED_AMOUNT_CHECK_TICK / speed);

      return () => {
        if (softTimer.current) {
          clearInterval(softTimer.current);
        }
      };
    }
  }, [speed, dispatch, earnedAmount]);

  window.updateCLNY = updateCLNYBalance;
  window.updateEarnedAll = updateEarnedAll;
  window.fetchBalance = fetchUserBalance;
  window.claim = async (tokens: number[]) => {
    if (window.xweb3 && address)
      await claimToken(tokens, address, window.xweb3);
  };
  window.collectAllStats = collectAllStats;
  window.getAccountsAssets = getAccountAssets;

  return {
    updateCLNYBalance,
    updateEarnedAll,
    fetchUserBalance,
    claimToken,
    collectAllStats,
    getAccountAssets,
    tokens,
    allMintedTokens,
    userBalance,
    earnedAmount,
    dailySpeed: speed,
    isCollectInProgress,
    clnyBalance,
    isLoadingTokens,
  };
};
