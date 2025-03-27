import { useLeaderboard } from '@features/global/hooks/useApi';
import { CommonModal } from '@global/components/commonModal';
import { Loader } from '@global/components/loader/loader';
import { MOBILE_BREAKPOINT } from '@global/constants';
import { CloseIcon } from '@images/icons/CloseIcon';
import { useAccount } from 'wagmi';
import {
  LeaderboardAddress,
  LeaderboardAmount,
  LeaderboardCloseButton,
  LeaderboardItem,
  LeaderboardList,
  LeaderboardPlace,
  LeaderboardRank,
  LeaderboardTitle,
  LeaderboardWrapper,
} from './leaderboard.styles';

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortenAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 7)}...${address.slice(-4)}`;
};

export const Leaderboard = ({ isOpen, onClose }: LeaderboardProps) => {
  const { address } = useAccount();
  const { leaderboard: leaderboardData, isLeaderboardLoading: loading } =
    useLeaderboard();

  console.log('leaderboardData', leaderboardData);

  if (!isOpen) return null;
  return (
    <CommonModal
      onClose={onClose}
      width="auto"
      isCloseButton={false}
      mobileBreakpoint={MOBILE_BREAKPOINT}
    >
      <LeaderboardWrapper>
        <LeaderboardCloseButton onClick={onClose}>
          <CloseIcon />
        </LeaderboardCloseButton>
        <LeaderboardTitle>Leaderboard</LeaderboardTitle>
        {loading ? (
          <Loader />
        ) : (
          <>
            {Boolean(leaderboardData?.place) && (
              <LeaderboardPlace>
                Your place is #{leaderboardData.place}
              </LeaderboardPlace>
            )}
            <LeaderboardList>
              {leaderboardData?.top100.map((item, index) => (
                <LeaderboardItem
                  key={item.address}
                  isCurrentUser={item.address === address}
                >
                  <LeaderboardRank>#{index + 1}</LeaderboardRank>
                  <LeaderboardAddress>
                    {shortenAddress(item.address)}
                  </LeaderboardAddress>
                  <LeaderboardAmount>
                    {item.amount.toFixed(2)} CLNY
                  </LeaderboardAmount>
                </LeaderboardItem>
              ))}
            </LeaderboardList>
          </>
        )}
      </LeaderboardWrapper>
    </CommonModal>
  );
};
