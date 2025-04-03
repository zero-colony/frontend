import React, { useState, useMemo, useEffect } from 'react';
import { Map, RefreshCw, Trophy } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { LINKS } from '@global/constants';
import { StatsBar } from '@features/global/components/statsBar';
import SocialIconsBar from '@features/lands/components/landsSidebar/SocialIconsBar';
import {
  useMyLands,
  useTotalEarning,
  useClaimEarned,
} from '@features/global/hooks/useCallContracts';
import { useAllLands } from '@features/global/hooks/useApi';
import { useAccount } from 'wagmi';
import { useBalance } from '@global/hooks/useBalance';
import { useToasts } from 'react-toast-notifications';
import { useLeaderboard } from '@features/global/hooks/useApi';
import { CloseIcon } from '@images/icons/CloseIcon';
import { NETWORK_DATA } from '@root/settings';
import { getClnySpeedLabel } from '@features/lands/utils/formating';
import { GAP_TEXT } from '@global/constants';
import { LandPlot } from '@features/lands/components/land/LandPlot';
import { Loader } from '@global/components/loader/loader';
import useAppParts from '@global/hooks/useAppParts';
import Button from '@global/components/button';
import { fromWeiValue } from '@global/utils/fromWei';
import Backend from '@root/api/backend';

// Prize stats type
interface PrizeStats {
  prizeEth: number;
  prizeUsd: number;
}

// Hooks and components from landsSidebar
const usePrizeStats = (): PrizeStats => {
  const [prizeStats, setPrizeStats] = useState<PrizeStats>({
    prizeEth: 0,
    prizeUsd: 0,
  });

  useEffect(() => {
    const fetchPrizeStats = async () => {
      try {
        const stats = await Backend.getLandStats();
        setPrizeStats({
          prizeEth: stats.prizeEth || 0,
          prizeUsd: stats.prizeUsd || 0,
        });
      } catch (error) {
        console.error('Failed to fetch prize stats:', error);
      }
    };
    fetchPrizeStats();
  }, []);

  return prizeStats;
};

// Prize pool component
const PrizePool = ({
  prizeStats,
  showSeasonsLink = false,
}: {
  prizeStats: PrizeStats;
  showSeasonsLink?: boolean;
}) => (
  <div className="border border-white/20 rounded-lg p-4 my-4">
    <div className="flex flex-col">
      <div className="mb-2">
        <p className="text-gray-400 text-sm">Prize pool</p>
        <p className="text-white font-bold text-lg">
          {prizeStats.prizeEth.toFixed(2)} ETH ($
          {prizeStats.prizeUsd.toLocaleString()})
        </p>
      </div>
      <div className="flex flex-col text-sm">
        <a
          href="https://zerocolony.notion.site/SPACE-RACE-A-Social-Experiment-1acd49cbead98046b271ea87fc98bea2"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-400 hover:text-red-300"
        >
          Learn more
        </a>
        {showSeasonsLink && (
          <a
            href="https://zerocolony.notion.site/Space-Race-Finalists-1bdd49cbead980309746d77cb5f30593"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 mt-1"
          >
            Seasons Finalists
          </a>
        )}
      </div>
    </div>
  </div>
);

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ icon, label, onClick }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center flex-1 py-2"
    >
      <div className="text-white mb-1">{icon}</div>
      <span className="text-white text-xs">{label}</span>
    </button>
  );
};

// Simple reusable components
const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold text-white uppercase text-center mb-4">
    {children}
  </h2>
);

const DialogCloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 text-white hover:text-red-400"
  >
    <CloseIcon />
  </button>
);

export const MobileNavigation = () => {
  const [isLandsOpen, setIsLandsOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const { currentLandsPage } = useAppParts();
  const { addToast } = useToasts();
  const { isConnected } = useAccount();
  const { myLands: tokens, isLoadingMyLands, hasNoLands } = useMyLands();
  const { isAllTokensLoading } = useAllLands();
  const { earnedAmount, earnSpeed: dailySpeed } = useTotalEarning();
  const { isCollectInProgress } = useBalance();
  const { claimEarned, isClaimingEarned } = useClaimEarned();
  const { leaderboard: leaderboardData, isLeaderboardLoading } =
    useLeaderboard();
  const { address } = useAccount();
  const prizeStats = usePrizeStats();

  const hasLands = Boolean(tokens?.length);

  const handleOpenLands = () => {
    setIsLandsOpen(true);
  };

  const handleCloseLands = () => {
    setIsLandsOpen(false);
  };

  const handleOpenLeaderboard = () => {
    setIsLeaderboardOpen(true);
  };

  const handleCloseLeaderboard = () => {
    setIsLeaderboardOpen(false);
  };

  const handleOpenTrade = () => {
    window.open(LINKS.zero.dex, '_blank');
  };

  const onBuyLandClick = () => {
    addToast('You can buy new lands on the globe', { appearance: 'info' });
  };

  const title = useMemo(
    () =>
      isAllTokensLoading ? 'Loading...' : `Lands: ${tokens?.length ?? '...'}`,
    [tokens, isAllTokensLoading]
  );

  const isLandPaginated = (index: number) =>
    index >= (currentLandsPage - 1) * 10 && index < currentLandsPage * 10;

  const allTimeStats = useMemo(() => {
    const earned = !earnedAmount
      ? `0 ${NETWORK_DATA.TOKEN_NAME} earned`
      : `${earnedAmount} ${NETWORK_DATA.TOKEN_NAME} earned`;

    const dailySpeedLabel = dailySpeed
      ? getClnySpeedLabel(dailySpeed)
      : GAP_TEXT;

    return `${earned} | ${dailySpeedLabel}`;
  }, [earnedAmount, dailySpeed]);

  const shortenAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 7)}...${address.slice(-4)}`;
  };

  return (
    <>
      {/* Lands Dialog */}
      <Dialog.Root
        open={isLandsOpen}
        onOpenChange={(open) => !open && handleCloseLands()}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed inset-0 z-50 bg-black/50 overflow-y-auto p-4">
            <DialogCloseButton onClick={handleCloseLands} />
            <div className="pt-6">
              <SocialIconsBar />
              <StatsBar />

              <div className="">
                <PrizePool prizeStats={prizeStats} showSeasonsLink={true} />

                {hasLands ? (
                  <div className="mt-6">
                    <div className="text-center mb-6">
                      <DialogTitle>{title}</DialogTitle>
                      <div className="mt-4">
                        <Button
                          disabled={isClaimingEarned}
                          onClick={() => claimEarned()}
                          text="COLLECT ALL"
                          variant="common"
                          disabledText="Collecting..."
                        />
                        <p className="text-xs text-gray-300 mt-2">
                          {allTimeStats}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      {isAllTokensLoading && <Loader />}
                      {tokens?.map((token, index) => (
                        <div key={`${token}-${index}`}>
                          {isLandPaginated(index) && (
                            <LandPlot
                              key={`${token}-${index}`}
                              id={parseInt(token ?? '')}
                              trigger={isCollectInProgress}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    {isLoadingMyLands && isConnected ? (
                      <>
                        <DialogTitle>Loading...</DialogTitle>
                        <Loader />
                      </>
                    ) : (
                      <>
                        <DialogTitle>You do not have lands</DialogTitle>
                        {(!isConnected || hasNoLands) && (
                          <>
                            <Button
                              onClick={onBuyLandClick}
                              text="Claim land"
                              variant="common"
                            />
                            <p className="text-xs text-gray-300 mt-2">
                              {NETWORK_DATA.ECONOMY === 'fixed'
                                ? 'Earn up to 14 CLNY/day from a land'
                                : `Earn up to ${fromWeiValue(
                                    String(14) ?? '...'
                                  )} CLNY/day from a land`}
                            </p>
                          </>
                        )}
                      </>
                    )}

                    <PrizePool prizeStats={prizeStats} />
                  </div>
                )}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Leaderboard Dialog */}
      <Dialog.Root
        open={isLeaderboardOpen}
        onOpenChange={(open) => !open && handleCloseLeaderboard()}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed inset-0 z-50 overflow-y-auto p-4">
            <DialogCloseButton onClick={handleCloseLeaderboard} />
            <div className="pt-8">
              <DialogTitle>Leaderboard</DialogTitle>

              {isLeaderboardLoading ? (
                <div className="flex justify-center">
                  <Loader />
                </div>
              ) : (
                <div>
                  {!!leaderboardData?.place && (
                    <p className="text-center text-red-400 mb-4">
                      Your place is #{leaderboardData.place}
                    </p>
                  )}

                  <div className="flex flex-col gap-2">
                    {leaderboardData?.top100?.map((item, index) => (
                      <div
                        key={item.address}
                        className={`flex items-center p-2 rounded ${
                          item.address === address
                            ? 'bg-red-500/10'
                            : 'bg-white/5'
                        }`}
                      >
                        <a
                          href={`https://app.zerion.io/${item.address}/overview`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center w-full text-white no-underline"
                        >
                          <span className="w-10 font-bold">#{index + 1}</span>
                          <span className="flex-1 mx-2 font-mono flex items-center gap-2">
                            {shortenAddress(item.address)}
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="opacity-70 scale-75"
                            >
                              <path
                                d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15 3H21V9"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10 14L21 3"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="font-bold text-red-400">
                            {item.amount.toFixed(2)} CLNY
                          </span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 py-1 shadow-lg backdrop-blur-xs sm:hidden z-30">
        <div className="flex justify-around h-16 items-center">
          <NavItem
            icon={<Map size={20} />}
            label="Lands"
            onClick={handleOpenLands}
          />
          <NavItem
            icon={<RefreshCw size={20} />}
            label="Trade CLNY"
            onClick={handleOpenTrade}
          />
          <NavItem
            icon={<Trophy size={20} />}
            label="Leaderboard"
            onClick={handleOpenLeaderboard}
          />
        </div>
      </div>
    </>
  );
};
