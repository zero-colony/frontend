import { NETWORK_DATA } from '@root/settings';

type LeaderboardResponse = {
  top100: {
    address: string;
    amount: number;
    updatedAt: string;
  }[];
  place: number;
};

class Backend {
  static getLandStats = async () => {
    try {
      const rawResponse = await fetch(
        `${NETWORK_DATA.LAND_META_SERVER}metrics`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      const content = await rawResponse.json();
      return content;
    } catch (err) {
      return {};
    }
  };

  static getHeaderStats = async () => {
    const rawResponse = await fetch(
      `${NETWORK_DATA.LAND_META_SERVER}clny-stat`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    const content = await rawResponse.json();
    return content;
  };

  static getLeaderboard = async (address: string) => {
    try {
      const rawResponse = await fetch(
        `${NETWORK_DATA.LAND_META_SERVER}leaderboard/${address}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      const content = (await rawResponse.json()) as LeaderboardResponse;
      return content;
    } catch (err) {
      return {};
    }
  };
}

export default Backend;
