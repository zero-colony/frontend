import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '@redux/selectors/commonAppSelectors';
import {
  setCLNYManager,
  setGameManager,
  setMCManager
} from '@redux/slices/commonAppStateSlice';
import Ethereum from '@root/api/etheriumWeb3';

const { clnyManagerSelector, mcManagerSelector, userGameManagerSelector } =
  selectors;

const useContracts = () => {
  const dispatch = useDispatch();

  const gameManager = useSelector(userGameManagerSelector) ?? window.GM;
  const mcManager = useSelector(mcManagerSelector) ?? window.MCM;
  const clnyManager = useSelector(clnyManagerSelector) ?? window.CLNYM;

  const initializeContracts = () => {
    getGameManager();
  };

  const getMCManager = React.useCallback(() => {
    const mc = Ethereum.getMC();
    dispatch(setMCManager(mc));
    return mc;
  }, []);

  const getCLNYManager = React.useCallback(() => {
    const clny = Ethereum.getCLNYManager();
    dispatch(setCLNYManager(clny));
    return clny;
  }, []);

  const getGameManager = React.useCallback(() => {
    const gm = Ethereum.getGameManager();
    dispatch(setGameManager(gm));
    return gm;
  }, [dispatch]);

  return {
    initializeContracts,
    gameManager,
    clnyManager,
    mcManager,
    getCLNYManager,
    getGameManager,
    getMCManager
  };
};

export default useContracts;
