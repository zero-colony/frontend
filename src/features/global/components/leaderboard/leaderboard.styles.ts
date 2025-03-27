import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '@global/constants';

export const LeaderboardWrapper = styled.div`
  width: 508px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  padding: 0 20px 20px;
  color: white;
  overflow-y: auto;
  position: relative;
  margin: 0 auto;
  margin-top: -25px;
  padding-top: 0;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100vw;
    margin: -25px -20px 0;
    padding: 0 20px 20px;
  }
`;

export const LeaderboardTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  margin: 0;
  padding: 0;
  font-family: 'Play', sans-serif;
  text-transform: uppercase;
  line-height: 48px;
  font-weight: 700;
`;

export const LeaderboardCloseButton = styled.div`
  position: absolute;
  top: 18px;
  right: 20px;
  cursor: pointer;
  z-index: 2;

  svg {
    width: 12px;
    height: 12px;
    path {
      stroke: #ffffff;
    }
  }

  &:hover {
    svg path {
      stroke: #fe5161;
    }
  }
`;

export const LeaderboardPlace = styled.div`
  font-size: 18px;
  text-align: center;
  margin: 0 0 20px;
  color: #fe5161;
  font-family: 'Play', sans-serif;
`;

export const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const LeaderboardItem = styled.div<{ isCurrentUser?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  background: ${(props) =>
    props.isCurrentUser
      ? 'rgba(254, 81, 97, 0.1)'
      : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 4px;
  font-family: 'Play', sans-serif;
`;

export const LeaderboardRank = styled.span`
  width: 40px;
  font-weight: bold;
`;

export const LeaderboardAddress = styled.span`
  flex: 1;
  margin: 0 10px;
  font-family: monospace;
`;

export const LeaderboardAmount = styled.span`
  font-weight: bold;
  color: #fe5161;
`;
