import { getDefaultConfig } from 'connectkit';
import { createConfig, http, injected } from 'wagmi';
import { zeroNetwork } from 'wagmi/chains';

import { type Chain } from 'viem';

export const zeroTestnet = {
  id: 4457845,
  name: 'Zero Testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.zerion.io/v1/zero-sepolia'] },
  },
} as const satisfies Chain;

export const wagmiConfig = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [zeroNetwork, zeroTestnet],
    connectors: [
      injected({
        target: 'metaMask',
      }),
    ],

    transports: {
      // RPC URL for each chain
      [zeroNetwork.id]: http('https://zero.drpc.org'),
      [zeroTestnet.id]: http('https://rpc.zerion.io/v1/zero-sepolia'),
    },

    // Required API Keys
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: 'Your App Name',

    // Optional App Info
    appDescription: 'Your App Description',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);
