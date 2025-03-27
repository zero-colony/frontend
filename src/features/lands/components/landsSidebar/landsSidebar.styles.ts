import { commonFlexColumn, commonFlexLine } from '@global/styles/app.styles';
import { fontProperty } from '@global/styles/fonts.styles';
import { RGB_BLACK, WHITE } from '@global/styles/variables';
import styled, { css } from 'styled-components';

const LandsSidebarWrapper = styled.div<{
  withLands?: boolean;
  isVisible?: boolean;
  isMobile?: boolean;
}>`
  // background: ${RGB_BLACK};
  backdrop-filter: blur(10px);
  width: 508px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  padding: 20px 16px 40px 8px;
  z-index: 10;
  transition: all 0.3s;
  box-sizing: border-box;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  left: -700px;
  opacity: 0;
  visibility: hidden;

  ${({ withLands, isVisible, isMobile }) => {
    const withLandsPart = withLands
      ? css`
          padding: 20px 16px 20px 8px;
        `
      : css``;
    const mobilePart = isMobile
      ? css`
          left: 0;
          width: 100vw;
          padding: 20px 16px 20px;
        `
      : css``;

    if (isVisible) {
      return css`
        left: 70px;
        opacity: 1;
        visibility: visible;
        ${withLandsPart};
        ${mobilePart};
      `;
    }
  }};
`;

const NoLandsTitle = styled.div`
  ${fontProperty};
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const LandsSidebarHeaderWrapper = styled.header<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${WHITE};
  padding-top: 0;
  width: 100%;
  ${({ isMobile }) => {
    if (isMobile) {
      return css`
        align-items: flex-start;
        margin-bottom: 15px;
        div:first-child {
          margin-bottom: 10px;
        }
      `;
    }
  }};
`;

const LandsContentWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const LandsSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BorderedDiv = styled.div`
  width: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;

  @media (max-width: 768px) {
    width: 50%;
    min-height: unset;
    padding: 8px;
  }
`;

const SpanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;
`;

const LandsSpan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CollectSpan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const LandsBlock = styled.div`
  margin-top: 40px;
`;

const ButtonSubText = styled.p`
  font-family: 'Helvetica', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 11px;
  margin: 0;
  text-align: center;
`;

const ButtonNoLandsSubText = styled.p`
  font-family: 'Helvetica', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 11px;
  margin: 0;
  text-align: center;
  margin-top: 10px;
`;

const ActiveLandsTitle = styled.p`
  ${fontProperty};
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  text-transform: uppercase;
  margin: 0;
  text-align: center;
`;

const ActiveLandsFirstLine = styled.div`
  ${commonFlexLine};
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 0;
  width: 100%;
`;

const ActiveLandsControlWrapper = styled.div`
  ${commonFlexColumn};
  align-items: center;
`;

const PrizeSpanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const PrizeSpan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const PrizeLinksSpan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const PrizePoolText = styled.div`
  ${fontProperty};
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  text-transform: uppercase;
  color: ${WHITE};
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const PrizeAmountText = styled(PrizePoolText)`
  margin-top: 4px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const LearnMoreLink = styled.a`
  font-family: 'Helvetica', sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 700;
  color: ${WHITE};
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
  margin-top: 8px;

  &:hover {
    opacity: 0.8;
  }
`;

export {
  ActiveLandsControlWrapper,
  ActiveLandsFirstLine,
  ActiveLandsTitle,
  ButtonSubText,
  LandsBlock,
  LandsSidebarHeaderWrapper,
  LandsSidebarWrapper,
  NoLandsTitle,
  BorderedDiv,
  LandsContentWrapper,
  LandsSection,
  SpanWrapper,
  LandsSpan,
  CollectSpan,
  PrizeSpanWrapper,
  PrizeSpan,
  PrizePoolText,
  PrizeAmountText,
  LearnMoreLink,
  ButtonNoLandsSubText,
  PrizeLinksSpan,
};
