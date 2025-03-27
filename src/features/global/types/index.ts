import { Contract } from 'web3-eth-contract';

export type ConnectEventsType = 'click' | 'switch';

export enum CONNECT_EVENTS {
  click = 'click',
  switch = 'switch'
}

export enum METAMASK_EVENTS {
  call = 'call',
  send = 'send'
}

export enum PROVIDER_EVENTS {
  disconnect = 'disconnect',
  accountsChanged = 'accountsChanged',
  chainChanged = 'chainChanged'
}

export type MetamaskWrapperType = {
  address: string;
  contract: Contract | Promise<Contract>;
  type?: METAMASK_EVENTS.send | METAMASK_EVENTS.call;
  method: string;
  params?: any;
  onSuccess?: (result?: any) => void;
  onError?: (error?: any) => void;
  onLoad?: (hash?: any) => void;
  errorText?: string;
  eventName?: string;
  transactionOptions?: Record<string, any>;
  responseType?: any;
};

export enum CONTRACT_METHODS {
  balanceOf = 'balanceOf',
  getFee = 'getFee',
  claim = 'claim',
  safeTransferFrom = 'safeTransferFrom',
  claimEarned = 'claimEarned',
  allMyTokens = 'allMyTokens',
  allMyTokensPaginate = 'allMyTokensPaginate',
  setAccountPrivacy = 'setAccountPrivacy',
  accountMissionState = 'accountMissionState',
  getEarned = 'getEarned',
  getEarningData = 'getEarningData',
  getAttributesMany = 'getAttributesMany',
  getEarningSpeed = 'getEarningSpeed',
  buildBaseStation = 'buildBaseStation',
  upgradeTransport = 'buildTransport',
  upgradeRobotAssembly = 'buildRobotAssembly',
  upgradePowerProduction = 'buildPowerProduction',
  openLootbox = 'openLootbox',
  lastOwnedTokenURI = 'lastOwnedTokenURI',
  setLocks = 'setLocks',
  getLockedGears = 'getLockedGears',
  clnyInUsd = 'clnyInUsd',
  getCoord = 'getCoord',
  lastMintedByUser = 'lastMintedByUser',
  getNames = 'getNames',
  getTransportCondition = 'getTransportCondition',
  repairTransport = 'repairTransport'
}

export enum TOASTS_APPEARANCE {
  error = 'error',
  success = 'success'
}

export type ButtonVariantsType = 'common' | 'ghost' | 'error';

export enum SIDEBAR_ROUTES_NAMES {
  home = 'Home',
  lands = 'Lands',
  profile = 'Profile',
  play = 'Play',
  missions = 'Missions',
  aiTrade = 'Trade CLNY',
  leaderboard = 'Leaderboard',
  market = 'Market',
  governance = 'Governance',
  referral = 'Referral',
  mining = 'Mining'
}
