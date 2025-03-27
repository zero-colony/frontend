import { RootState } from '@redux/store';

export const earnedAmountSelector = (state: RootState) =>
  state.balanceStats.earnedAmount;

export const clnyBalanceSelector = (state: RootState) =>
  state.balanceStats.clnyBalance;

export const userBalanceSelector = (state: RootState) =>
  state.balanceStats.balance;

export const tokensSelector = (state: RootState) => state.balanceStats.tokens;

export const mintedTokensSelector = (state: RootState) =>
  state.balanceStats.allMintedTokens;

export const addressSelector = (state: RootState) => state.balanceStats.address;

export const earnSpeedSelector = (state: RootState) =>
  state.balanceStats.earnSpeed;

export const landsMissionsLimitsSelector = (state: RootState) =>
  state.balanceStats.landMissionsLimits;

export const avatarsMissionsLimitsSelector = (state: RootState) =>
  state.balanceStats.avatarMissionsLimits;
