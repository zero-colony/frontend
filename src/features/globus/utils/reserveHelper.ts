import { NETWORK_DATA } from '@root/settings';
import md5 from 'md5';

const mumbai = NETWORK_DATA.ID === 80001;
const DOMAIN = 'https://zero-cart.zerocolony.fun';

export const hash = (
  address: string,
  token: number,
  mumbai: boolean
): string => {
  if (mumbai) {
    return md5(`glass-${address}-${token}-trident`).substring(4, 10);
  }
  return md5(`magnet-${address}-${token}-stadium`).substring(4, 10);
};

export const isReserved = async (token: number): Promise<boolean> => {
  try {
    const data = await fetch(
      `${DOMAIN}/is-reserved?token=${token}&mumbai=${mumbai ? '1' : ''}`
    );
    if (data.status > 299) {
      return false;
    }
    const result = await data.json();
    return result[0];
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getReserve = async (): Promise<number[] | null> => {
  try {
    const data = await fetch(`${DOMAIN}/reserved${mumbai ? '-mumbai' : ''}`);
    if (data.status > 299) {
      return null;
    }
    return await data.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTokens = async (): Promise<number[] | null> => {
  try {
    const data = await fetch(`${NETWORK_DATA.LAND_META}`);
    if (data.status > 299) {
      return null;
    }
    return await data.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const reserve = async (token: number): Promise<number[] | null> => {
  try {
    const data = await fetch(`${DOMAIN}/reserve`, {
      method: 'POST',
      body: JSON.stringify({
        token,
        mumbai,
        wallet: address,
        hash: hash(address, token, mumbai)
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (data.status > 299) {
      return null;
    }
    const result = await data.json();
    if (result.success) return result.reserve;
    else return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const freeReserve = async (token: number): Promise<number[] | null> => {
  try {
    const data = await fetch(`${DOMAIN}/free`, {
      method: 'DELETE',
      body: JSON.stringify({
        token,
        mumbai,
        wallet: address,
        hash: hash(address, token, mumbai)
      })
    });
    if (data.status > 299) {
      return null;
    }
    return await data.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
