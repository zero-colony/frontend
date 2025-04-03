import { formatCurrency } from '@features/global/utils/formatCurrency';
import {
  GamePageDetailedButton,
  GamePageDetailedInfo,
  GamePageDetailedMeta,
  GamePageDetailedPlotWrapper,
  GamePageDetailedStats,
  GamePageEnhancementsOverlay,
  GamePageInfoButtonContainer,
  LandPlotDescriptionB,
  LandPlotEarned,
  LandPlotEarnedButton,
  LandPlotEarnedText,
  LandPlotImageWrapper,
  LandPlotLink,
  MainDetailedPlotWrapper,
} from '@features/lands/styles/landPlot.styles';
import { getClnySpeedLabel } from '@features/lands/utils/formating';
import useMediaQuery from '@global/hooks/useMediaQuery';
import { generateBlockie } from '@global/utils/blockie.canvas';
import { ArrowDown } from '@images/icons/ArrowDown';
import { NETWORK_DATA } from '@root/settings';
import { selectObjectToSet } from '@slices/gameManagementSlice';
import { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatEther } from 'viem';

type GameLandPlotType = {
  id: number;
  enhancements: ReactElement;
  earningSpeed: bigint | undefined | null;
  earned: bigint | undefined | null;
};

export const GameLandPlot = ({
  id,
  enhancements,
  earningSpeed,
  earned,
}: GameLandPlotType) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width: 1200px)');

  const [opened, setOpened] = useState(false);

  return (
    <MainDetailedPlotWrapper>
      <GamePageDetailedPlotWrapper isOpened={opened}>
        <GamePageInfoButtonContainer>
          <GamePageDetailedMeta>
            <LandPlotImageWrapper>
              <img
                src={generateBlockie(id).toDataURL()}
                alt={'Land Plot #' + id.toString()}
              />
            </LandPlotImageWrapper>
            <GamePageDetailedInfo>
              <LandPlotLink>Land #{id}&nbsp;</LandPlotLink>
              <GamePageDetailedStats>
                <LandPlotDescriptionB marginTop={15}>
                  {Boolean(earningSpeed) && (
                    <>
                      <span className="sm:hidden text-[#c4c4c4]">Mining: </span>
                      {NETWORK_DATA.ECONOMY === 'fixed'
                        ? getClnySpeedLabel(earningSpeed)
                        : `${earningSpeed} ${
                            earningSpeed === 1 ? 'share' : 'shares'
                          }`}
                    </>
                  )}
                  {!earningSpeed && 'Loading...'}
                </LandPlotDescriptionB>
                <LandPlotEarned>
                  Earned:{' '}
                  <LandPlotEarnedText>
                    {earned !== undefined
                      ? `${formatCurrency(earned, 4)} ${
                          NETWORK_DATA.TOKEN_NAME
                        }`
                      : 'Loading...'}
                  </LandPlotEarnedText>
                </LandPlotEarned>
              </GamePageDetailedStats>
            </GamePageDetailedInfo>
          </GamePageDetailedMeta>

          <GamePageDetailedButton>
            <LandPlotEarnedButton
              onClick={(e) => {
                e.stopPropagation();
                setOpened(!opened);
                if (opened) {
                  dispatch(selectObjectToSet(null));
                  setOpened(false);
                }
              }}
            >
              Build
              <ArrowDown upside={opened} />
            </LandPlotEarnedButton>
          </GamePageDetailedButton>
        </GamePageInfoButtonContainer>
        {opened && (
          <GamePageEnhancementsOverlay
            isMobile={isMobile}
            onMouseEnter={() => {
              dispatch(selectObjectToSet(null));
            }}
          >
            {enhancements}
          </GamePageEnhancementsOverlay>
        )}
      </GamePageDetailedPlotWrapper>
    </MainDetailedPlotWrapper>
  );
};
