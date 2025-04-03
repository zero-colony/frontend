import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleMyLandsPopup } from '@redux/slices/appPartsSlice';
import { useMediaQuery } from 'usehooks-ts';
import { MOBILE_BREAKPOINT } from '@global/constants';

export const useAppInitialization = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);

  useEffect(() => {
    if (!isMobile) {
      dispatch(toggleMyLandsPopup(true));
    }
  }, [dispatch, isMobile]);
};

export default useAppInitialization;
