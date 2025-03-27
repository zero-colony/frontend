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
  useCLNYBalance,
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

export const LandsSidebar = () => {
  const dispatch = useDispatch();
  const { isMyLandsShown: sidebarType } = useAppParts();

  // const { tokens } = useBalance();
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);

  const { myLands: tokens } = useMyLands();

  const getContent = () => {
    if (sidebarType) {
      return !tokens?.length ? (
        <NoLandsSidebarView />
      ) : (
        <ActiveLandsSidebarView />
      );
    }

    return null;
  };

  const hasLands = Boolean(tokens?.length);

  return (
    <LandsSidebarWrapper
      withLands={hasLands}
      isVisible={sidebarType}
      isMobile={isMobile}
    >
      <CartCloseIconWrapper>
        <MarsNavMyLandClose
          onClick={() => {
            dispatch(toggleMyLandsPopup(null));
          }}
        >
          <CloseIcon />
        </MarsNavMyLandClose>
      </CartCloseIconWrapper>
      {getContent()}
    </LandsSidebarWrapper>
  );
};

export const NoLandsSidebarView = () => {
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const { addToast } = useToasts();
  const { isLoadingMyLands: isLoadingMyTokens, hasNoLands } = useMyLands();
  const { isConnected } = useAccount();

  const { isLeaderboardPopupOpened } = useAppParts();
  const dispatch = useDispatch();

  const maxClnyIncome = 14;

  const onBuyLandClick = () => {
    addToast('You can buy new lands on the globe', { appearance: 'info' });
  };

  useEffect(() => {
    if (isLeaderboardPopupOpened) {
      setIsLeaderboardOpen(true);
    }
  }, [isLeaderboardPopupOpened]);

  const [prizeStats, setPrizeStats] = useState({ prizeEth: 0, prizeUsd: 0 });

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

  return (
    <LandsSidebarHeaderWrapper>
      <SocialIconsBar />
      <StatsBar />
      <Leaderboard
        isOpen={isLeaderboardOpen}
        onClose={() => {
          setIsLeaderboardOpen(false);
          dispatch(toggleLeaderboardPopup(false));
        }}
      />

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
              {/* <LearnMoreLink
                onClick={() => setIsLeaderboardOpen(true)}
                style={{ cursor: 'pointer' }}
              >
                Leaderboard
              </LearnMoreLink> */}
            </PrizeLinksSpan>
          </PrizeSpanWrapper>
        </BorderedDiv>
      </LandsContentWrapper>
    </LandsSidebarHeaderWrapper>
  );
};

export const ActiveLandsSidebarView = () => {
  const { isAllTokensLoading } = useAllLands();
  const { myLands: myTokens } = useMyLands();
  const { earnedAmount, earnSpeed: dailySpeed } = useTotalEarning();

  const { clnyBalanceWei } = useCLNYBalance();

  const { collectAllStats, isCollectInProgress } = useBalance();

  const dispatch = useDispatch();
  const [prizeStats, setPrizeStats] = useState({ prizeEth: 0, prizeUsd: 0 });
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const { currentLandsPage } = useAppParts();
  const { isLeaderboardPopupOpened } = useAppParts();

  const title = useMemo(
    () =>
      isAllTokensLoading ? 'Loading...' : `Lands: ${myTokens?.length ?? '...'}`,
    [myTokens, isAllTokensLoading]
  );
  const isCollectAvailable = Boolean(myTokens?.length) && Boolean(earnedAmount);
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);

  const isLandPaginated = (index: number) =>
    index >= (currentLandsPage - 1) * 10 && index < currentLandsPage * 10;

  const allTimeStats = useMemo(() => {
    const earned = !earnedAmount
      ? `0 ${NETWORK_DATA.TOKEN_NAME} earned`
      : `${earnedAmount} ${NETWORK_DATA.TOKEN_NAME} earned`;

    const speed = () => {
      if (dailySpeed) {
        return getClnySpeedLabel(dailySpeed);
      } else return GAP_TEXT;
    };

    return `${earned} | ${speed()}`;
  }, [earnedAmount, dailySpeed]);

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

  useEffect(() => {
    if (isLeaderboardPopupOpened) {
      setIsLeaderboardOpen(true);
    }
  }, [isLeaderboardPopupOpened]);

  const { claimEarned, isClaimingEarned } = useClaimEarned();

  return (
    <div>
      <LandsSidebarHeaderWrapper isMobile={isMobile}>
        <SocialIconsBar />
        <StatsBar />
        <Leaderboard
          isOpen={isLeaderboardOpen}
          onClose={() => {
            setIsLeaderboardOpen(false);
            dispatch(toggleLeaderboardPopup(false));
          }}
        />
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
                <LearnMoreLink
                  href="https://zerocolony.notion.site/Space-Race-Finalists-1bdd49cbead980309746d77cb5f30593"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Season 1 Finalists
                </LearnMoreLink>
              </PrizeLinksSpan>
            </PrizeSpanWrapper>
          </BorderedDiv>
        </LandsContentWrapper>
      </LandsSidebarHeaderWrapper>
      <LandsBlock>
        {isAllTokensLoading && <Loader />}
        {myTokens
          ? Array.from(myTokens ?? []).map((token, index) => {
              return (
                <div key={`${token}-${index}`}>
                  {isLandPaginated(index) && (
                    <LandPlot
                      key={`${token}-${index}`}
                      id={parseInt(token ?? '')}
                      trigger={isCollectInProgress}
                    />
                  )}
                </div>
              );
            })
          : null}
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
  return (
    <TokensWrapper>
      <FlexedPlotDivider />
      <div className="flex-30">
        {currentPage > 1 && (
          <div
            onClick={() => dispatch(setLandPageNumber(currentPage - 1))}
            className="pointer"
          >
            <ArrowLeft />
          </div>
        )}
      </div>
      <div className="flex-160">
        {(currentPage - 1) * 10 + 1}-
        {Math.min(currentPage * 10, tokens?.length ?? 0)} of{' '}
        {tokens?.length ?? 0}
      </div>
      <div className="flex-30">
        {tokens?.length && currentPage < tokens.length / 10 && (
          <div
            onClick={() => dispatch(setLandPageNumber(currentPage + 1))}
            className="pointer"
          >
            <ArrowRight />
          </div>
        )}
      </div>
      <FlexedPlotDivider />
    </TokensWrapper>
  );
};
