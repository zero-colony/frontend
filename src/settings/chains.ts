import { NETWORK_DATA } from './index';

export type ChainData = {
  ticker: string;
  name: string;
  explorer: string;
  x2: undefined | '0x2';
};

export const APP_VERSION = import.meta.env.VITE_VERSION;

const ZERO_TESTNET_CHAIN_ID = 4457845;
const ZERO_CHAIN_ID = 543210;

type ChainId = typeof ZERO_TESTNET_CHAIN_ID | typeof ZERO_CHAIN_ID;
export const CURRENT_NET = NETWORK_DATA.ID as ChainId;
const CHAIN_DATA: Record<ChainId, ChainData> = {
  [ZERO_TESTNET_CHAIN_ID]: {
    ticker: 'ETH',
    name: 'Zero Testnet',
    explorer: 'https://explorer.zerion.io/v1/zero-sepolia',
    x2: undefined,
  },
  [ZERO_CHAIN_ID]: {
    ticker: 'ETH',
    name: 'Zero',
    explorer: 'https://zero-network.calderaexplorer.xyz',
    x2: undefined,
  },
};

export const CURRENT_CHAIN = CHAIN_DATA[CURRENT_NET];
