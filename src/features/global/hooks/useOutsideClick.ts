import { useEffect } from 'react';
import { SELECT_GEAR_BUTTON_ID } from '@features/play/constants';

// To avoid unexpected closes in different cases
const FORBIDDEN_IDS = [SELECT_GEAR_BUTTON_ID];

function useOutsideClick(ref: any, handler: (e: any) => void) {
  useEffect(() => {
    const listener = (event: any) => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        FORBIDDEN_IDS.includes(event.target.id)
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useOutsideClick;
