import { zeroTestnet } from '@root/settings/wagmi';
import { PropsWithChildren, useEffect } from 'react';
import { zeroNetwork } from 'viem/chains';
import { useAccount, useSwitchChain } from 'wagmi';

export const CorrectNetworkProvider = ({ children }: PropsWithChildren) => {
  const { isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  // switch chain if not zero
  useEffect(() => {
    switchChain(
      import.meta.env.VITE_NETWORK === 'zero-testnet'
        ? { chainId: zeroTestnet.id }
        : { chainId: zeroNetwork.id }
    );
  }, [isConnected, switchChain]);

  return <>{children}</>;
};
