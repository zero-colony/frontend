import { textProperty } from '@features/global/styles/text.styles';
import { WHITE } from '@global/styles/variables';
import styled from 'styled-components';

export const PolygonScreenWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('/UIParts/polygon_planet_statistics.jpg');
  background-size: cover;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StatisticWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 60px;
  gap: 40px;

  width: 960px;
  height: 196px;

  background: rgba(33, 35, 43, 0.6);
  backdrop-filter: blur(10px);

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    height: 480px;
  }

  @media screen and (max-width: 405px) {
    width: 250px;
  }

  @media screen and (max-width: 370px) {
    height: 500px;
    width: 220px;
  }
`;

export const StatisticTitle = styled.h2`
  font-family: 'Play', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;

  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: ${WHITE};

  @media screen and (max-width: 528px) {
    font-size: 23px;
  }
`;

export const StatisticContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  gap: 40px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const StatisticContent = styled.div<{
  Width?: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px 10px 10px;
  gap: 20px;

  width: ${({ Width }) => Width ?? '221px'};
  height: 68px;

  background: #000000;
  border-radius: 4px;

  @media screen and (max-width: 1024px) {
    width: 272px;
  }
`;

export const IconContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 100000;
  background: #1c1c1f;
`;

export const Statistic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 10px;
`;

export const StatisticCount = styled.span`
  margin-right: 6px;
  font-family: 'Play', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  ${textProperty};

  color: #ffffff;
`;

export const StatisticText = styled.span`
  font-family: 'Helvetica', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;

  color: rgba(255, 255, 255, 0.7);
`;
