import { createSlice } from '@reduxjs/toolkit';
import { AbiItem } from 'web3-utils';
import { IProviderInfo } from 'web3modal';

export interface CommonAppState {
  provider: IProviderInfo | null;
  gameManager: any;
  replaceManager: AbiItem[] | null;
  clnyManager: AbiItem[] | null;
  mcManager: AbiItem[] | null;
  isLoading: Record<string, boolean>;
  isConnected: boolean;
  isInitialized: boolean;
  isCollecting: boolean;
  isGameObjectFocused: boolean;
}

const initialState: CommonAppState = {
  provider: null,
  gameManager: null,
  replaceManager: null,
  clnyManager: null,
  mcManager: null,
  isLoading: {
    tokensLoading: false
  },
  isConnected: false,
  isInitialized: false,
  isCollecting: false,
  isGameObjectFocused: false
};

export const commonStateSlice = createSlice({
  name: 'Common App State',
  initialState,
  reducers: {
    setGameManager: (state, action) => {
      state.gameManager = action.payload;
    },
    setReplaceManager: (state, action) => {
      state.replaceManager = action.payload;
    },
    setCLNYManager: (state, action) => {
      state.clnyManager = action.payload;
    },
    setMCManager: (state, action) => {
      state.mcManager = action.payload;
    },
    setUserProvider: (state, action) => {
      state.provider = action.payload;
    },
    resetInitializationOnDisconnect: (state) => {
      state.provider = null;
      state.isInitialized = false;
      state.isConnected = false;
    },
    setIsCollecting: (state, action) => {
      state.isCollecting = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading[action.payload?.field] = action.payload.value;
    },
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setFocusStatus: (state, action) => {
      state.isGameObjectFocused = action.payload;
    }
  }
});

export const {
  setGameManager,
  setReplaceManager,
  resetInitializationOnDisconnect,
  setIsCollecting,
  setIsLoading,
  setInitialized,
  setIsConnected,
  setUserProvider,
  setFocusStatus,
  setMCManager,
  setCLNYManager
} = commonStateSlice.actions;

export default commonStateSlice.reducer;
