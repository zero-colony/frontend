import { RootState } from '@redux/store';

export const userGameManagerSelector = (state: RootState) =>
  state.common.gameManager;

export const replaceManagerSelector = (state: RootState) =>
  state.common.replaceManager;

export const clnyManagerSelector = (state: RootState) =>
  state.common.clnyManager;

export const mcManagerSelector = (state: RootState) => state.common.mcManager;

export const isCollectingSelector = (state: RootState) =>
  state.common.isCollecting;

export const isLoadingTokensSelector = (state: RootState) =>
  state.common.isLoading?.tokensLoading ?? false;

export const isInitializedSelector = (state: RootState) =>
  state.common.isInitialized ?? false;

export const isConnecting = (state: RootState) => state.common.isConnected;

export const providerSelector = (state: RootState) => state.common.provider;
