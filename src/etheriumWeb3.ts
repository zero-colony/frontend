import { CLNY_ABI as CLNY } from '@root/abi/CLNY';
import { GAME_MANAGER_ABI as GM } from '@root/abi/GameManager';
import { MC_ABI as MC } from '@root/abi/MC';
import { ReplaceABI as RM } from '@root/abi/ReplaceABI';
import { NETWORK_DATA } from '@root/settings';
import { AbiItem } from 'web3-utils';

class Ethereum {
  static getMC = () => {
    return (window.MC =
      window.MC ||
      new window.xweb3!.eth.Contract(MC as AbiItem[], NETWORK_DATA.MC));
  };

  static getCLNYManager = () => {
    return (window.CLNY =
      window.CLNY ||
      new window.xweb3!.eth.Contract(CLNY as AbiItem[], NETWORK_DATA.CLNY));
  };

  static getGameManager = () => {
    return (window.GM =
      window.GM ||
      new window.xweb3!.eth.Contract(GM as AbiItem[], NETWORK_DATA.GM));
  };

  static getReplaceManager = () => {
    return (window.RM =
      window.RM ||
      new window.xweb3!.eth.Contract(RM as AbiItem[], NETWORK_DATA.REPLACE));
  };

  static getTokens = async (): Promise<string[]> => {
    if (NETWORK_DATA.SOLDOUT) {
      return new Array(21000).fill('').map((item, index) => index.toString());
    }
    try {
      const response = await fetch(NETWORK_DATA.LAND_META);
      const result = (await response.json()) as string[];
      return result.map((o) => `${o}`);
    } catch (err) {
      return [];
    }
  };
}

export default Ethereum;
