import { RootState } from '@redux/store';

const baseAvailabilitySelector = (state: RootState) =>
  state.game?.landPlacesInfo?.base?.availability ?? false;

const basePlacementSelector = (state: RootState) => {
  const { x, y } = state.game?.landPlacesInfo?.base?.coords ?? {};
  return x !== '0' || y !== '0';
};

const transportAvailabilitySelector = (state: RootState) =>
  state.game?.landPlacesInfo?.transport?.availability ?? false;

const transportPlacementSelector = (state: RootState) => {
  const { x, y } = state.game?.landPlacesInfo?.transport?.coords ?? {};
  return x !== '0' || y !== '0';
};

const powerplantAvailabilitySelector = (state: RootState) =>
  state.game?.landPlacesInfo?.powerplant?.availability ?? false;

const powerplantPlacementSelector = (state: RootState) => {
  const { x, y } = state.game?.landPlacesInfo?.powerplant?.coords ?? {};
  return x !== '0' || y !== '0';
};

const robotsAvailabilitySelector = (state: RootState) =>
  state.game?.landPlacesInfo?.robot?.availability ?? false;

const robotsPlacementSelector = (state: RootState) => {
  const { x, y } = state.game?.landPlacesInfo?.robot?.coords ?? {};
  return x !== '0' || y !== '0';
};

const isBuildPendingSelector = (state: RootState) =>
  state.game?.isBuildPending ?? false;

const isReplaceModeSelector = (state: RootState) =>
  state.game?.isReplaceMode ?? false;

const gameInfoPopupSelector = (state: RootState) => state.game?.gamePopupInfo;

export {
  baseAvailabilitySelector,
  basePlacementSelector,
  gameInfoPopupSelector,
  isBuildPendingSelector,
  isReplaceModeSelector,
  powerplantAvailabilitySelector,
  powerplantPlacementSelector,
  robotsAvailabilitySelector,
  robotsPlacementSelector,
  transportAvailabilitySelector,
  transportPlacementSelector
};
