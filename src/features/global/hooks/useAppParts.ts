import { useSelector } from 'react-redux';
import {
  isLeaderboardPopupSelector,
  isMyLandSelector,
  myLandPageSelector
} from '@selectors/appPartsSelectors';

const useAppParts = () => {
  const isMyLandsShown = useSelector(isMyLandSelector);
  const isLeaderboardPopupOpened = useSelector(isLeaderboardPopupSelector);
  const currentLandsPage = useSelector(myLandPageSelector);

  return {
    isMyLandsShown,
    currentLandsPage,
    isLeaderboardPopupOpened
  };
};

export default useAppParts;
