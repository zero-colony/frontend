import { StatsBar } from '@features/global/components/statsBar';
import { LandPlot } from '@features/lands/components/land/LandPlot';
import { FlexedPlotDivider } from '@features/lands/styles/landPlot.styles';
import { getClnySpeedLabel } from '@features/lands/utils/formating';
import Button from '@global/components/button';
import { Leaderboard } from '@global/components/leaderboard';
import { Loader } from '@global/components/loader/loader';
import { GAP_TEXT, MOBILE_BREAKPOINT } from '@global/constants';
import useAppParts from '@global/hooks/useAppParts';
import { useBalance } from '@global/hooks/useBalance';
import useMediaQuery from '@global/hooks/useMediaQuery';
import { MarsNavMyLandClose, TokensWrapper } from '@global/styles/app.styles';
import { fromWeiValue } from '@global/utils/fromWei';
import { ArrowLeft, ArrowRight } from '@images/icons/ArrowDown';
import { CloseIcon } from '@images/icons/CloseIcon';
import Backend from '@root/api/backend';
import { CartCloseIconWrapper } from '@root/legacy/navbar.styles';
import { NETWORK_DATA } from '@root/settings';
import {
  setLandPageNumber,
  toggleLeaderboardPopup,
  toggleMyLandsPopup,
} from '@slices/appPartsSlice';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import SocialIconsBar from './SocialIconsBar';

import { useAllLands } from '@features/global/hooks/useApi';
import {
  useClaimEarned,
  useMyLands,
  useTotalEarning,
} from '@features/global/hooks/useCallContracts';
import {
  ActiveLandsControlWrapper,
  ActiveLandsFirstLine,
  ActiveLandsTitle,
  BorderedDiv,
  ButtonNoLandsSubText,
  ButtonSubText,
  CollectSpan,
  LandsBlock,
  LandsContentWrapper,
  LandsSection,
  LandsSidebarHeaderWrapper,
  LandsSidebarWrapper,
  LandsSpan,
  LearnMoreLink,
  NoLandsTitle,
  PrizeAmountText,
  PrizeLinksSpan,
  PrizePoolText,
  PrizeSpan,
  PrizeSpanWrapper,
  SpanWrapper,
} from './landsSidebar.styles';
import { useAccount } from 'wagmi';

// Prize stats type
interface PrizeStats {
  prizeEth: number;
  prizeUsd: number;
}

// Common hooks and helper functions
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

const useLeaderboardControl = () => {
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const { isLeaderboardPopupOpened } = useAppParts();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLeaderboardPopupOpened) {
      setIsLeaderboardOpen(true);
    }
  }, [isLeaderboardPopupOpened]);

  const closeLeaderboard = () => {
    setIsLeaderboardOpen(false);
    dispatch(toggleLeaderboardPopup(false));
  };

  return { isLeaderboardOpen, closeLeaderboard };
};

// Prize pool component to avoid duplication
const PrizePool = ({
  prizeStats,
  showSeasonsLink = false,
}: {
  prizeStats: PrizeStats;
  showSeasonsLink?: boolean;
}) => (
  <BorderedDiv>
    <PrizeSpanWrapper>
      <PrizeSpan>
        <PrizePoolText>Prize pool</PrizePoolText>
        <PrizeAmountText>
          {prizeStats.prizeEth.toFixed(2)} ETH ($
          {prizeStats.prizeUsd.toLocaleString()})
        </PrizeAmountText>
      </PrizeSpan>
      <PrizeLinksSpan>
        <LearnMoreLink
          href="https://zerocolony.notion.site/SPACE-RACE-A-Social-Experiment-1acd49cbead98046b271ea87fc98bea2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </LearnMoreLink>
        {showSeasonsLink && (
          <LearnMoreLink
            href="https://zerocolony.notion.site/Space-Race-Finalists-1bdd49cbead980309746d77cb5f30593"
            target="_blank"
            rel="noopener noreferrer"
          >
            Seasons Finalists
          </LearnMoreLink>
        )}
      </PrizeLinksSpan>
    </PrizeSpanWrapper>
  </BorderedDiv>
);

// Main sidebar component
export const LandsSidebar = () => {
  const dispatch = useDispatch();
  const { isMyLandsShown: sidebarType } = useAppParts();
  const { myLands: tokens } = useMyLands();
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const hasLands = Boolean(tokens?.length);

  const handleClose = () => dispatch(toggleMyLandsPopup(null));

  return (
    <LandsSidebarWrapper
      withLands={hasLands}
      isVisible={sidebarType}
      isMobile={isMobile}
    >
      <CartCloseIconWrapper>
        <MarsNavMyLandClose onClick={handleClose}>
          <CloseIcon />
        </MarsNavMyLandClose>
      </CartCloseIconWrapper>
      {sidebarType &&
        (hasLands ? <ActiveLandsSidebarView /> : <NoLandsSidebarView />)}
    </LandsSidebarWrapper>
  );
};

// No lands view component
export const NoLandsSidebarView = () => {
  const { addToast } = useToasts();
  const { isLoadingMyLands: isLoadingMyTokens, hasNoLands } = useMyLands();
  const { isConnected } = useAccount();
  const prizeStats = usePrizeStats();
  const { isLeaderboardOpen, closeLeaderboard } = useLeaderboardControl();
  const maxClnyIncome = 14;

  const onBuyLandClick = () => {
    addToast('You can buy new lands on the globe', { appearance: 'info' });
  };

  return (
    <LandsSidebarHeaderWrapper>
      <SocialIconsBar />
      <StatsBar />
      <Leaderboard isOpen={isLeaderboardOpen} onClose={closeLeaderboard} />

      <LandsContentWrapper>
        <LandsSection>
          <SpanWrapper>
            <LandsSpan>
              {isLoadingMyTokens && isConnected ? (
                <>
                  <NoLandsTitle>Loading...</NoLandsTitle>
                  <Loader />
                </>
              ) : (
                <>
                  <NoLandsTitle>
                    You do not <br /> have lands
                  </NoLandsTitle>

                  {(!isConnected || hasNoLands) && (
                    <>
                      <Button
                        onClick={onBuyLandClick}
                        text="Claim land"
                        variant="common"
                      />
                      <ButtonNoLandsSubText>
                        {NETWORK_DATA.ECONOMY === 'fixed'
                          ? 'Earn up to 14 CLNY/day from a land'
                          : `Earn up to ${fromWeiValue(
                              String(maxClnyIncome) ?? '...'
                            )} CLNY/day from a land`}
                      </ButtonNoLandsSubText>
                    </>
                  )}
                </>
              )}
            </LandsSpan>
          </SpanWrapper>
        </LandsSection>

        <PrizePool prizeStats={prizeStats} />
      </LandsContentWrapper>
    </LandsSidebarHeaderWrapper>
  );
};

// Active lands view component
export const ActiveLandsSidebarView = () => {
  const { isAllTokensLoading } = useAllLands();
  const { myLands: myTokens } = useMyLands();
  const { earnedAmount, earnSpeed: dailySpeed } = useTotalEarning();
  const { isCollectInProgress } = useBalance();
  const prizeStats = usePrizeStats();
  const { isLeaderboardOpen, closeLeaderboard } = useLeaderboardControl();
  const { currentLandsPage } = useAppParts();
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  const { claimEarned, isClaimingEarned } = useClaimEarned();

  const title = useMemo(
    () =>
      isAllTokensLoading ? 'Loading...' : `Lands: ${myTokens?.length ?? '...'}`,
    [myTokens, isAllTokensLoading]
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

  return (
    <div>
      <LandsSidebarHeaderWrapper isMobile={isMobile}>
        <SocialIconsBar />
        <StatsBar />
        <Leaderboard isOpen={isLeaderboardOpen} onClose={closeLeaderboard} />
        <LandsContentWrapper>
          <LandsSection>
            <SpanWrapper>
              <LandsSpan>
                <ActiveLandsFirstLine>
                  <ActiveLandsControlWrapper>
                    <ActiveLandsTitle>{title}</ActiveLandsTitle>
                  </ActiveLandsControlWrapper>
                </ActiveLandsFirstLine>
              </LandsSpan>
              <CollectSpan>
                <Button
                  disabled={isClaimingEarned}
                  onClick={() => claimEarned()}
                  text="COLLECT ALL"
                  variant="common"
                  disabledText="Collecting..."
                />
                <ButtonSubText>{allTimeStats}</ButtonSubText>
              </CollectSpan>
            </SpanWrapper>
          </LandsSection>
          <PrizePool prizeStats={prizeStats} showSeasonsLink={true} />
        </LandsContentWrapper>
      </LandsSidebarHeaderWrapper>
      <LandsBlock>
        {isAllTokensLoading && <Loader />}
        {myTokens?.map((token, index) => (
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
      </LandsBlock>
      {myTokens && (
        <LandsPagination currentPage={currentLandsPage} tokens={myTokens} />
      )}
    </div>
  );
};

const LandsPagination = ({
  currentPage,
  tokens = [],
}: {
  currentPage: number;
  tokens: string[];
}) => {
  const dispatch = useDispatch();

  const goToPrevPage = () => dispatch(setLandPageNumber(currentPage - 1));
  const goToNextPage = () => dispatch(setLandPageNumber(currentPage + 1));

  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, tokens.length);
  const hasNextPage = tokens.length > currentPage * 10;
  const hasPrevPage = currentPage > 1;

  return (
    <TokensWrapper>
      <FlexedPlotDivider />
      <div className="flex-30">
        {hasPrevPage && (
          <div onClick={goToPrevPage} className="pointer">
            <ArrowLeft />
          </div>
        )}
      </div>
      <div className="flex-160">
        {startItem}-{endItem} of {tokens.length}
      </div>
      <div className="flex-30">
        {hasNextPage && (
          <div onClick={goToNextPage} className="pointer">
            <ArrowRight />
          </div>
        )}
      </div>
      <FlexedPlotDivider />
    </TokensWrapper>
  );
};
