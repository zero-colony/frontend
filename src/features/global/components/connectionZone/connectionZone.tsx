import { useBalance } from '@features/global/hooks/useBalance';
import {
  useCLNYBalance,
  useEthBalance,
} from '@features/global/hooks/useCallContracts';
import useMediaQuery from '@features/global/hooks/useMediaQuery';
import {
  copyTextToClipboard,
  formatWallet,
} from '@features/globus/utils/methods';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import Button from '@global/components/button';
import {
  MainAppContainer,
  MobileTableBlock,
  MobileTableBlockBalance,
  MobileTableText,
  MobileTableWalletBlock,
  MobileTableWrapperWallet,
  NewHeaderAddressText,
  NewHeaderInfoWrapper,
  NewHeaderStatInnerWrapper,
  NewHeaderStatWrapper,
} from '@global/styles/app.styles';
import EthIconImg from '@images/photo/connection-zone-icons/eth.png';
import MarsIconImg from '@images/photo/connection-zone-icons/MarsIcon.png';
import PolygonIconImg from '@images/photo/connection-zone-icons/PolygonIcon.png';
import { Copy } from '@root/images/icons/Copy';
import { ImageIconWrapper } from '@root/images/icons/imageIconWrapper';
import { WalletIcon } from '@root/images/icons/WalletIcon';
import { NETWORK_DATA } from '@root/settings';
import { CURRENT_CHAIN } from '@root/settings/chains';
import { isConnectionPopupSelector } from '@selectors/appPartsSelectors';
import { toggleConnectionPopup } from '@slices/appPartsSlice';
import { ConnectKitButton } from 'connectkit';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { useAccount, useDisconnect } from 'wagmi';

export const ConnectionZone = () => {
  const dispatch = useDispatch();
  const popupRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToasts();
  // const clnyBalance = useSelector(clnyBalanceSelector);
  const showConnectionPopup = useSelector(isConnectionPopupSelector);
  const isTableMobile = useMediaQuery(`(min-width: 630px)`);
  const [contentSpace, setContentSpace] = useState<string>('space-between');
  const { address, isDisconnected, isConnecting, isReconnecting } =
    useAccount();
  const { disconnect } = useDisconnect();
  const { userBalance: balance } = useBalance();

  const { clnyBalance } = useCLNYBalance();
  const { ethBalance } = useEthBalance();

  // Floating UI setup
  const { refs, floatingStyles, context } = useFloating({
    open: showConnectionPopup,
    onOpenChange: (open) => dispatch(toggleConnectionPopup(open)),
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  useEffect(() => {
    const handleMouseClick = (event: MouseEvent) => {
      let flagConnection = false;
      for (const value of event.composedPath()) {
        if (
          'headerInfo' === (value as HTMLElement).id ||
          'connectionInfo' === (value as HTMLElement).id ||
          'connectionPopup' === (value as HTMLElement).id
        ) {
          flagConnection = true;
          break;
        }
      }
      if (!flagConnection) {
        dispatch(toggleConnectionPopup(false));
      }
    };

    document.addEventListener('click', handleMouseClick);

    return () => {
      document.removeEventListener('click', handleMouseClick);
    };
  }, [showConnectionPopup]);

  if (isDisconnected) {
    return (
      <ConnectKitButton.Custom>
        {({ show }) => (
          <Button
            connectButton={true}
            text="Connect wallet"
            variant="common"
            onClick={() => show?.()}
          />
        )}
      </ConnectKitButton.Custom>
    );
  }

  if (isConnecting || isReconnecting) {
    return <div>Connecting...</div>;
  }

  return (
    <MainAppContainer>
      {isTableMobile ? (
        <NewHeaderInfoWrapper
          id={'headerInfo'}
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <NewHeaderStatWrapper>
            <ImageIconWrapper src={MarsIconImg} dimension="14px" />
            {clnyBalance ?? 0} {NETWORK_DATA.TOKEN_NAME}
          </NewHeaderStatWrapper>
          <NewHeaderStatWrapper>
            <ImageIconWrapper
              src={
                CURRENT_CHAIN.ticker === 'MATIC' ? PolygonIconImg : EthIconImg
              }
              dimension="14px"
            />
            {ethBalance} {CURRENT_CHAIN.ticker}
          </NewHeaderStatWrapper>
          <NewHeaderStatWrapper>
            <NewHeaderStatInnerWrapper>
              <WalletIcon />
              <NewHeaderAddressText>
                {formatWallet(address)}
              </NewHeaderAddressText>
            </NewHeaderStatInnerWrapper>
          </NewHeaderStatWrapper>
        </NewHeaderInfoWrapper>
      ) : (
        <MobileTableWrapperWallet
          content={contentSpace}
          id={'headerInfo'}
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <MobileTableBlockBalance>
            <MobileTableBlock>
              <ImageIconWrapper src={MarsIconImg} dimension="14px" />
              <MobileTableText>{clnyBalance}</MobileTableText>
            </MobileTableBlock>
            <MobileTableBlock>
              <ImageIconWrapper
                src={
                  CURRENT_CHAIN.ticker === 'MATIC' ? PolygonIconImg : EthIconImg
                }
                dimension="14px"
              />
              <MobileTableText>{balance}</MobileTableText>
            </MobileTableBlock>
          </MobileTableBlockBalance>
          <MobileTableWalletBlock>
            <WalletIcon />
          </MobileTableWalletBlock>
        </MobileTableWrapperWallet>
      )}

      {showConnectionPopup && (
        <FloatingPortal>
          <FloatingFocusManager context={context}>
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                width: refs.reference.current?.clientWidth,
              }}
              id="connectionPopup"
              className="bg-[#2E2E33] rounded-lg p-4 shadow-lg z-50"
              {...getFloatingProps()}
            >
              <div className="mb-4">
                <div className="text-lg font-bold text-white mb-2">Account</div>
                <div>
                  <div className="">
                    <a
                      href="/"
                      className="text-white text-sm flex items-center gap-2 w-full overflow-hidden text-ellipsis hover:text-opacity-80 transition-colors"
                      onClick={(event) => {
                        event.preventDefault();
                        copyTextToClipboard(address)
                          .then(() => {
                            addToast('Address has been copied to clipboard', {
                              appearance: 'success',
                            });
                          })
                          .catch((error) => {
                            console.error(error);
                            addToast('Copying to clipboard has failed', {
                              appearance: 'error',
                            });
                          });
                      }}
                    >
                      <span className="overflow-hidden text-ellipsis">
                        {address}
                      </span>{' '}
                      <Copy className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex  items-center *:flex-1/2 gap-2">
                <button
                  className="w-full h-[30px] flex items-center justify-center uppercase cursor-pointer font-bold text-xs  bg-[#FE5161] rounded-md  transition-colors"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </button>
                <div className="flex items-center">
                  <a
                    href={`${CURRENT_CHAIN.explorer}/address/${address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center h-[30px] flex items-center justify-center uppercase text-xs font-bold cursor-pointer text-white bg-[#1C1C1F] rounded-md transition-colors"
                  >
                    Explorer
                  </a>
                </div>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </MainAppContainer>
  );
};
