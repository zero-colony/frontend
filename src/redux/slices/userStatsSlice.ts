import { createSlice } from '@reduxjs/toolkit';

export interface BalanceStateInterface {
  balance: number;
  clnyBalance: number;
  allMintedTokens: string[] | null;
  earnedAmount: number;
  earnSpeed: number;
  tokens: string[] | null;
  address: string;
  landsStats: any[];
  landMissionsLimits: Record<string, number> | null;
  avatarMissionsLimits: Record<string, number> | null;
}

const initialState: BalanceStateInterface = {
  balance: -1,
  clnyBalance: -1,
  allMintedTokens: null,
  earnedAmount: 0,
  earnSpeed: 0,
  tokens: null,
  address: '',
  landsStats: [],
  landMissionsLimits: null,
  avatarMissionsLimits: null
};

export const balanceStatsSlice = createSlice({
  name: 'User Balance Stats',
  initialState,
  reducers: {
    setUserBalance: (state, action) => {
      state.balance = action.payload;
    },
    setEarnedAmount: (state, action) => {
      state.earnedAmount = action.payload;
    },
    setEarnSpeed: (state, action) => {
      state.earnSpeed = action.payload;
    },
    setUserTokens: (state, action) => {
      if (!Array.isArray(action.payload)) {
        state.tokens = null;
      } else {
        state.tokens = Array.from(
          new Set([...(state.tokens ?? []), ...action.payload].flat())
        );
      }
    },
    resetUserTokens: (state) => {
      state.tokens = null;
    },
    setColonyBalance: (state, action) => {
      state.clnyBalance = action.payload;
    },
    setMintedTokens: (state, action) => {
      state.allMintedTokens = [
        ...(state.allMintedTokens ?? []),
        ...action.payload
      ].flat();
    },
    resetMintedTokens: (state, action) => {
      state.allMintedTokens = action.payload;
    },
    resetUserBalance: (state) => {
      state.allMintedTokens = null;
      state.tokens = null;
      state.balance = 0;
      state.clnyBalance = 0;
      state.address = '';
      state.earnedAmount = 0;
      state.earnSpeed = 0;
      state.landsStats = [];
      state.landMissionsLimits = null;
      state.avatarMissionsLimits = null;
    },
    setAddress: (state, action) => {
      window.address = action.payload;
      state.address = action.payload;
    },
    setLandsStats: (state, action) => {
      state.landsStats = action.payload;
    },
    setLandsMissionsLimits: (state, action) => {
      state.landMissionsLimits = action.payload;
    },
    setAvatarsMissionsLimits: (state, action) => {
      state.avatarMissionsLimits = action.payload;
    }
  }
});

export const {
  setEarnedAmount,
  setEarnSpeed,
  setColonyBalance,
  setUserBalance,
  resetUserBalance,
  setUserTokens,
  setMintedTokens,
  resetMintedTokens,
  setAddress,
  resetUserTokens,
  setLandsStats,
  setLandsMissionsLimits,
  setAvatarsMissionsLimits
} = balanceStatsSlice.actions;

export default balanceStatsSlice.reducer;
