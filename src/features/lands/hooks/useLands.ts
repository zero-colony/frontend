import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useMetamask from '@features/global/hooks/useMetamask';
import { userGameManagerSelector } from '@selectors/commonAppSelectors';
import {
  addressSelector,
  landsMissionsLimitsSelector
} from '@selectors/userStatsSelectors';

const useLands = (tokens: string[] | null, ethInstance?: any) => {
  const [stats, setStats] = useState<unknown[]>([]);
  const gm = useSelector(userGameManagerSelector);
  const address = useSelector(addressSelector);
  const landsMissionsLimits = useSelector(landsMissionsLimitsSelector);
  const { makeCallRequest } = useMetamask();

  const getData = useCallback(() => {
    makeCallRequest<unknown[]>({
      contract: gm ?? window.GM,
      method: 'getAttributesMany',
      params: [tokens],
      address,
      errorText: 'Error getting lands list stats'
    }).then(async (stats) => {
      if (stats) {
        setStats(stats);
      }
    });
  }, [gm, tokens]);

  useEffect(() => {
    if (!tokens || !ethInstance) return;

    (async () => await getData())();
  }, [tokens, gm, address, ethInstance, getData]);

  return { stats, landsMissionsLimits };
};

export default useLands;
