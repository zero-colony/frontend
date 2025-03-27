import { configureStore } from '@reduxjs/toolkit';
import appPartsReducer from '@slices/appPartsSlice';
import commonStateReducer from '@slices/commonAppStateSlice';
import gameManagementReducer from '@slices/gameManagementSlice';
import balanceStatsReducer from '@slices/userStatsSlice';

export const store = configureStore({
  reducer: {
    appParts: appPartsReducer,
    balanceStats: balanceStatsReducer,
    common: commonStateReducer,
    game: gameManagementReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
