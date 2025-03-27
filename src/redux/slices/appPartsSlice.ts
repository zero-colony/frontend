import { createSlice } from '@reduxjs/toolkit';

export interface AppPartsInterface {
  isConnectionPopupOpened: boolean;
  isMyLandsShown: boolean;
  myLandsPageNumber: number;
  isLandMissionsAvailable: boolean;
  isPrivateAccount: boolean | null;
  isRevshareModalOpened: boolean;
  isGearPopupOpened: boolean;
  isLeaderboardPopupOpened: boolean;
}

const initialState: AppPartsInterface = {
  isConnectionPopupOpened: false,
  isMyLandsShown: true,
  myLandsPageNumber: 1,
  isLandMissionsAvailable: false,
  isPrivateAccount: null,
  isRevshareModalOpened: false,
  isGearPopupOpened: false,
  isLeaderboardPopupOpened: false
};

export const appPartsSlice = createSlice({
  name: 'App Parts Handler',
  initialState,
  reducers: {
    toggleConnectionPopup: (state, action) => {
      state.isConnectionPopupOpened = action.payload;
    },
    toggleMyLandsPopup: (state, action) => {
      state.isMyLandsShown = action.payload;
    },
    toggleLeaderboardPopup: (state, action) => {
      state.isLeaderboardPopupOpened = action.payload;
    },
    setLandPageNumber: (state, action) => {
      state.myLandsPageNumber = action.payload;
    }
  }
});

export const {
  toggleConnectionPopup,
  toggleMyLandsPopup,
  setLandPageNumber,
  toggleLeaderboardPopup
} = appPartsSlice.actions;

export default appPartsSlice.reducer;
