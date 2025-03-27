import { useQuery } from '@tanstack/react-query';
import Ethereum from '@root/api/etheriumWeb3';
import Backend from '@root/backend';
import { useAccount } from 'wagmi';

export const useAllLands = () => {
  const {
    data: allLands,
    isLoading: isAllLandsLoading,
    refetch: refetchAllLands,
  } = useQuery({
    queryKey: ['allTokens'],
    queryFn: () => Ethereum.getTokens(),
  });

  return {
    allTokens: allLands,
    isAllTokensLoading: isAllLandsLoading,
    refetchAllTokens: refetchAllLands,
  };
};

export const useLeaderboard = () => {
  const { address } = useAccount();

  const { data: leaderboard, isLoading: isLeaderboardLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => {
      const a =
        (address as string) ?? '0x0000000000000000000000000000000000000000';

      console.log('a', a);

      return Backend.getLeaderboard(a);
    },
  });

  return { leaderboard, isLeaderboardLoading };
};
