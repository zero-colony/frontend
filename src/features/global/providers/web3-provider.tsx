import { wagmiConfig, zeroTestnet } from '@root/settings/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider } from 'connectkit';
import { zeroNetwork } from 'viem/chains';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

// // Set up the localStorage persister
// if (typeof window !== 'undefined') {
//   const localStoragePersister = createSyncStoragePersister({
//     storage: window.localStorage,
//     key: 'MARS_APP_QUERY_CACHE',
//   });

//   // Enable persistence
//   persistQueryClient({
//     queryClient,
//     persister: localStoragePersister,
//     maxAge: 1000 * 60 * 60 * 4, // 4 hours
//   });
// }

// zeroNetwork
const connectKitOptions = {
  initialChainId:
    import.meta.env.VITE_NETWORK === 'zero-testnet'
      ? zeroTestnet.id
      : zeroNetwork.id,
};

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider options={connectKitOptions} mode="dark">
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
