import Layout from '@global/components/layout/layout';
import { BALANCE_CHECKER_INTERVAL } from '@global/constants';
import { useBalance } from '@global/hooks/useBalance';
import useGameManagement from '@global/hooks/useGameManagement';
import { extractURLParam } from '@global/utils/urlParams';
import { AppDispatch } from '@redux/store';
import * as Sentry from '@sentry/react';
import { dropGameInfo } from '@slices/gameManagementSlice';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';

function DataProvider({ children }: { children: ReactElement }) {
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const { collectAllLandInfo } = useGameManagement();
  const { address } = useAccount();

  const { tokens, updateEarnedAll } = useBalance();

  useEffect(() => {
    const id = extractURLParam(location, 'id');
    const isInitializedUser = Boolean(
      id && address && tokens && window.GM?.methods
    );

    if (isInitializedUser && id) {
      collectAllLandInfo(id).then(() => {});
    }

    if (location.pathname === '/') {
      dispatch(dropGameInfo());
    }
  }, [location.pathname, location.search, address, tokens]);

  React.useEffect(() => {
    if (!address) return;
    updateEarnedAll().then(() => {});

    const balanceChecker = setInterval(async () => {
      await updateEarnedAll();
    }, BALANCE_CHECKER_INTERVAL);

    return () => {
      clearInterval(balanceChecker);
    };
  }, [updateEarnedAll, address]);

  return <Layout>{children}</Layout>;
}

export default Sentry.withProfiler(DataProvider);
