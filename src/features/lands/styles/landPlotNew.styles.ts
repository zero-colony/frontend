import { fontProperty } from '@global/styles/fonts.styles';
import {
  DARK_GREY,
  DARK_GREY_2,
  TOXIC_GREEN,
  WHITE
} from '@global/styles/variables';
import styled, { css } from 'styled-components';

const LandPlotOuterWrapper = styled.div<{ isMobile?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background-color: ${DARK_GREY};
  margin-top: 10px;
  margin-bottom: 10px;
  gap: 25px;
  width: 451px;

  ${({ isMobile }) => {
    if (isMobile) {
      return css`
        width: fit-content;
        flex-wrap: wrap;
      `;
    }
  }};
`;

const LandPlotNewImageWrapper = styled.div`
  width: 40px;
  height: 40px;

  img {
    width: inherit;
    height: inherit;
  }
`;

const LandPlotNewName = styled.p`
  margin: 0;
  font-family: 'Helvetica', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #ffffff;
`;

const LandPlotNewIconWrapper = styled.div`
  display: flex;
  gap: 12px;

  &:hover {
    > div {
      path,
      svg {
        stroke: ${TOXIC_GREEN};
      }

      svg.with-fill {
        stroke: ${TOXIC_GREEN};
        fill: ${TOXIC_GREEN};
        path {
          fill: ${TOXIC_GREEN};
        }
      }
      filter: drop-shadow(0px 0px 10px #fe5161);
    }
  }

  > div {
    cursor: pointer;

    path,
    svg {
      stroke: ${TOXIC_GREEN};
    }

    svg.with-fill {
      stroke: ${TOXIC_GREEN};
      fill: ${TOXIC_GREEN};
      path {
        fill: ${TOXIC_GREEN};
      }
    }
  }
`;

const LandPlotNewStatItem = styled.div<{ direction?: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? 'row'};
  align-items: center;
  gap: 6px;
`;

const InfoMissionBlockHover = styled.div`
  display: none;
  width: 119px;
  height: 42px;
  position: absolute;
  background: #2e2e34;
  padding: 10px 20px;
  right: 146px;
  margin: 75px -84px 0 0;
  z-index: 2;

  @media (max-width: 425px) {
    right: 260px;
  }

  @media (max-width: 320px) {
    right: 146px;
  }
`;

const LandPlotNewStatValue = styled.div`
  padding: 2px 6px 3px;
  background-color: ${DARK_GREY_2};
  border-radius: 3px;
  color: ${WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  gap: 6px;

  :hover ~ ${InfoMissionBlockHover} {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }
`;

const InfoMissionHoverText = styled.p`
  ${fontProperty};
  font-family: 'Helvetica', sans-serif;
  font-weight: 400;
  font-size: 12px;

  margin: 0;
  color: ${WHITE};
`;

const InfoBlock = styled.span`
  :hover ~ ${InfoMissionBlockHover} {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 425px) {
    svg {
      width: 13px;
    }
  }
`;

const TimerCLNYInfo = styled.div`
  display: none;
  width: 119px;
  height: 42px;
  position: absolute;
  background: #2e2e34;
  padding: 10px 20px;
  right: -35px;
`;

const TimerInfoBlock = styled.span`
  :hover ~ ${TimerCLNYInfo} {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 425px) {
    svg {
      width: 13px;
    }
  }
`;

const LandPlotStatHeader = styled.p`
  font-family: 'Play', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.02em;
  color: #c4c4c4;
  margin: 0;
`;

const LandPlotNewRemove = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  text-transform: uppercase;
  color: #60e47d;
  margin: 0 0 0 auto;
  cursor: pointer;
`;

const LandPlotEnhancementsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const LandPlotTitleLine = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LandPlotStatsBlock = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;

  ${({ isMobile }) => {
    if (isMobile) {
      return css`
        align-items: flex-start;
      `;
    }
  }};
`;

const EnhancementsBlock = styled.div`
  > div {
    gap: 10px;
  }
`;

export {
  EnhancementsBlock,
  InfoBlock,
  InfoMissionBlockHover,
  InfoMissionHoverText,
  LandPlotEnhancementsBlock,
  LandPlotNewIconWrapper,
  LandPlotNewImageWrapper,
  LandPlotNewName,
  LandPlotNewRemove,
  LandPlotNewStatItem,
  LandPlotNewStatValue,
  LandPlotOuterWrapper,
  LandPlotStatHeader,
  LandPlotStatsBlock,
  LandPlotTitleLine,
  TimerCLNYInfo,
  TimerInfoBlock
};
