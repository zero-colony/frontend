import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum GAME_VIEW_MODES {
  build = 'build',
  navigation = 'navigation'
}

export const DEFAULT_POPUP_STATE = {
  title: '',
  text: '',
  level: 0,
  x: '0px',
  y: '0px',
  isActive: false,
  actions: [],
  type: ''
};

type InitialStateType = {
  landPlacesInfo: Record<
    string,
    { coords: { x: string; y: string; rotate: number }; availability: string }
  >;
  objectToPlace: string | null;
  isBuildPending: string;
  isRepaintNeeded: boolean;
  isReplaceMode: boolean;
  gamePopupInfo: {
    title: string;
    text: string;
    level: number;
    x: string;
    y: string;
    isActive: boolean;
    actions: string[];
    type: string;
  };
};

const initialState: InitialStateType = {
  landPlacesInfo: {},
  objectToPlace: null,
  isBuildPending: '',
  isRepaintNeeded: false,
  gamePopupInfo: DEFAULT_POPUP_STATE,
  isReplaceMode: false
};

const gameManagementReducer = createSlice({
  name: 'Game Management Handler',
  initialState,
  reducers: {
    setLandInfoPart: (
      state,
      action: PayloadAction<{ field: string; value: any; availability: string }>
    ) => {
      state.landPlacesInfo[action.payload.field] = {
        coords: action.payload.value,
        availability: action.payload.availability
      };
    },
    selectObjectToSet: (state, action) => {
      state.objectToPlace = action.payload;
    },
    dropGameInfo: (state) => {
      state.landPlacesInfo = {};
    },
    setRepaintMode: (state, action) => {
      state.isRepaintNeeded = action.payload;
    },
    setBuildPending: (state, action) => {
      state.isBuildPending = action.payload;
    },
    setGamePopupInfo: (state, action) => {
      state.gamePopupInfo = action.payload;
    },
    setReplaceMode: (state, action) => {
      state.isReplaceMode = action.payload;
    }
  }
});

export const {
  setLandInfoPart,
  dropGameInfo,
  selectObjectToSet,
  setBuildPending,
  setRepaintMode,
  setGamePopupInfo,
  setReplaceMode
} = gameManagementReducer.actions;
export default gameManagementReducer.reducer;
