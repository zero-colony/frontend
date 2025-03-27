import { NETWORK_DATA } from '@root/settings';
import { CURRENT_CHAIN } from '@root/settings/chains';

export const METHODS_LABELS = {
  landClaim: 'Land Plots claiming',
  landTransfer: (tokenId: string) => `Land Plot #${tokenId} transfer`,
  partialClaim: (part: number, partsCount: number) =>
    `Collecting: [${part} of ${partsCount}]`
};

export const BUNCH_SIZE = 60;

export const LOCAL_STORAGE_KEYS = {
  selectedAvatar: 'selectedAvatar',
  referralAddress: 'referralAddress',
  avatarSuggested: 'avatarSuggested',
  activatedQuest: (address: string) => `${address}-isQuestsActivated`
};

export const GAP_TEXT = ' ';

export const ADD_ETH_REQUEST_PAYLOAD = (chainId: string) => ({
  chainId,
  chainName: CURRENT_CHAIN.name,
  rpcUrls: [NETWORK_DATA.RPC],
  blockExplorerUrls: [CURRENT_CHAIN.explorer],
  nativeCurrency: {
    name: CURRENT_CHAIN.ticker,
    symbol: CURRENT_CHAIN.ticker,
    decimals: 18
  }
});

export const BALANCE_CHECKER_INTERVAL = 40000 * Math.random() + 40000;
export const EARNED_AMOUNT_CHECK_TICK = 1000 * (24 * 60 * 60) * 0.01;
export const LAND_STATS_CHECK_TICK = 20000 * Math.random() + 20000;
export const SPEED_STAT_CHECK_TICK = 1000 * (24 * 60 * 60) * 0.0001;
export const CLNY_PRICE_CHECK_TICK = 10000;

export const LINKS = {
  harmony: {
    colonyGuide: 'https://guide.marscolony.io/get-started/what-is-mars-colony',
    nftKey: 'https://nftkey.app/collections/martiancolonists/',
    lands: 'https://nftkey.app/collections/marscolony/',
    governance: 'https://snapshot.org/#/xclny.eth',
    dex: 'https://dex.marscolony.io/'
  },
  polygon: {
    colonyGuide: 'https://guide.marscolony.io/get-started/what-is-mars-colony',
    nftKey: 'https://nftkey.app/collections/martiancolonists/',
    governance: 'https://snapshot.org/#/marscolonyio.eth',
    dex: 'https://dex.marscolony.io/'
  },
  zero: {
    colonyGuide: 'https://guide.marscolony.io/get-started/what-is-mars-colony',
    nftKey: 'https://nftkey.app/collections/martiancolonists/',
    governance: 'https://snapshot.org/#/xclny.eth',
    dex: 'https://app.zerion.io/tokens/CLNY-4727f689-b592-4fe8-8299-d80cf5ff786c'
  }
};

export const MOBILE_BREAKPOINT = 630;

export const LOADING_TEXT = 'Loading...';

export const YOUTUBE_FRAME_DIMENSIONS = {
  width: '520',
  height: '292'
};

export const MUSIC_INFO: Array<{
  trackName: string;
  trackLink: string;
  musicPromoted: string;
  creativeAttribute: string;
  creativeAttributeLink: string;
  file_name: string;
}> = [
  {
    file_name: '/music/mars_1.mp3',
    trackName: 'JOURNEY TO MARS by Free Music',
    trackLink: 'https://soundcloud.com/fm_freemusic',
    musicPromoted: 'https://www.free-stock-music.com',
    creativeAttribute: 'Creative Commons Attribution 3.0 Unported License',
    creativeAttributeLink:
      'https://creativecommons.org/licenses/by/3.0/deed.en_US'
  },
  {
    file_name: '/music/mars_2.mp3',
    trackName: 'Approaching Mars by Arthur Vyncke',
    trackLink: 'https://soundcloud.com/arthurvost',
    musicPromoted: 'https://www.free-stock-music.com',
    creativeAttribute: 'Creative Commons Attribution-ShareAlike 3.0 Unported',
    creativeAttributeLink:
      'https://creativecommons.org/licenses/by-sa/3.0/deed.en_US'
  }
];

export const PROFESSION_RARITY = [
  { key: 'Profession', value: 'Miner', label: 'Profession (Miner)' },
  { key: 'Profession', value: 'Programmer', label: 'Profession (Programmer)' },
  { key: 'Profession', value: 'Scientist', label: 'Profession (Scientist)' },
  { key: 'Profession', value: 'Technician', label: 'Profession (Technician)' },
  { key: 'Background', value: 'Cadet Blue: Common', label: 'Rarity (Common)' },
  { key: 'Background', value: 'Explorer Purple: Rare', label: 'Rarity (Rare)' },
  {
    key: 'Background',
    value: 'Atlas Red: Legendary',
    label: 'Rarity (Legendary)'
  }
];

export const API_CALL_METHODS = {
  post: 'POST',
  get: 'GET'
};

export const COMMON_POST_PAYLOAD = {
  method: API_CALL_METHODS.post,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};
