import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { providerSelector } from '@selectors/commonAppSelectors';
import { addressSelector } from '@selectors/userStatsSelectors';
import Web3 from 'web3';

const useConnection = (web3Instance?: Web3 | null) => {
  const address = useSelector(addressSelector) ?? window.address;
  const provider = useSelector(providerSelector);

  return useMemo(() => {
    return !!address && !!provider && !!web3Instance;
  }, [address, provider, web3Instance]);
};

export default useConnection;
