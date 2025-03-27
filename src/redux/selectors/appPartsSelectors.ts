import { RootState } from '@redux/store';

export const isConnectionPopupSelector = (state: RootState) =>
  state.appParts.isConnectionPopupOpened;

export const isMyLandSelector = (state: RootState) =>
  state.appParts.isMyLandsShown;

export const isLeaderboardPopupSelector = (state: RootState) =>
  state.appParts.isLeaderboardPopupOpened;

export const myLandPageSelector = (state: RootState) =>
  state.appParts.myLandsPageNumber;
