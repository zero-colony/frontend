/// <reference types="vite/client" />

// Define the claim_land event interface
interface ClaimLandEvent extends CustomEvent {
  detail: {
    tokenId: number;
  };
}

// Add claim_land event to Window interface
interface WindowEventMap {
  claim_land: ClaimLandEvent;
}

// need var to work properly
export declare global {
  var xweb3: any;
  var MC: any;
  var CLNY: any;
  var GM: any;
  var AM: any;
  var LM: any;
  var RM: any;
  var MM: any;
  var LB: any;
  var CH: any;
  var MCM: any;
  var CLNYM: any;
  var LMM: any;
  var SLPM: any;
  var LPStats: any;
  var SLP: any;
  var disconnect: any;
  var dataLayer: any;
  var view: any;
  var claim: any;
  var transfer: any;
  var address: string;
  var ethereum: any;
  var unapprove: any;
  var window: any;
  var ogPopup: any;
  var goToCart: any;
  var navigateToToken: any;
  var updateCLNY: any;
  var updateEarnedAll: any;
  var fetchBalance: any;
  var collectAllStats: any;
  var getAccountsAssets: any;
  var dropLand: (beneficiar: string, id: number) => Promise<any>;
  var dropAvatars: (beneficiar: string, amount: number) => Promise<any>;
  var web3Instance: any;
  var connect: any;
  var Gleam: any;
  var GEARS: any;
  var ORACLE: any;
  var restartMiningGame: () => void;
  var navigateHook: (path: string) => void;
  var logEvent: (name: string, payload: Record<string, any>) => void;
  var toast: (name: string, args: Record<string, any>) => void;
  interface Window {
    sizeChanged: () => void;
    onZoomOut: (e: any) => void;
    onZoomIn: (e: any) => void;
    replace: any;
    placeBaseObject: (
      objType,
      tokenId,
      x,
      y,
      free,
      onSuccess,
      onFail,
      withBuild
    ) => Promise;
    placePowerplantObject: (
      objType,
      tokenId,
      x,
      y,
      free,
      onSuccess,
      onFail,
      withBuild
    ) => Promise;
    placeTransportObject: (
      objType,
      tokenId,
      x,
      y,
      free,
      onSuccess,
      onFail,
      withBuild
    ) => Promise;
    placeRobotsObject: (
      objType,
      tokenId,
      x,
      y,
      free,
      onSuccess,
      onFail,
      withBuild
    ) => Promise;
    game: Phaser.Game | null;
    getCLNY: () => void;
  }
}
