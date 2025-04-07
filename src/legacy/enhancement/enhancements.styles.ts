import { fontProperty } from "@global/styles/fonts.styles";
import styled, { css } from "styled-components";

const EnhancementItemWrapper = styled.div<{ isMobileView?: boolean }>`
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 112px;
`;

const EnhAux = styled.div`
  position: absolute;
  left: 80px;
  top: 10px;
  background: rgba(75, 222, 151, 0.1);
  border-radius: 3px;
  font-family: "Play", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  padding: 2px;
  color: #fe5161;
`;

const EnhImageWrapper = styled.div<{ minified?: boolean; isActive?: boolean }>`
  ${({ minified, isActive }) => {
    if (minified) {
      return css`
        * {
          fill: ${isActive ? "#fe5161" : "white"};
        }

        svg {
          height: 21px;
          width: fit-content;
          max-width: 32px !important;
        }
      `;
    }
    if (!minified) {
      return css`
        * {
          fill: ${isActive ? "#fe5161" : "white"};
        }

        svg {
          height: 30px;
          width: fit-content;
          max-width: 50px !important;
        }
      `;
    }
  }}
`;

const EnhBlockMinifiedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EnhTitle = styled.div`
  ${fontProperty};
  font-size: 12px;
  color: #ffffff;
`;

const EnhButtonOuterWrapper = styled.div`
  margin-top: 17px;
  text-align: center;
`;

const EnhOldNew = styled.div`
  ${fontProperty};
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  font-size: 9px;
  line-height: 10px;
  color: rgba(52, 255, 97, 0.8);
  margin-bottom: 21px;
  margin-top: 4px;
`;

const CounterBlockWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1px;
  justify-content: center;
  margin-top: 4px;
`;

const CounterBlock = styled.div<{ isActive?: boolean }>`
  width: 6px;
  height: 2px;
  background: #c4c4c4;
  border-radius: 200px;

  ${({ isActive }) => {
    if (isActive) {
      return css`
        background-color: #fe5161;
      `;
    }
  }}
`;

export {
  CounterBlock,
  CounterBlockWrapper,
  EnhancementItemWrapper,
  EnhAux,
  EnhBlockMinifiedWrapper,
  EnhButtonOuterWrapper,
  EnhImageWrapper,
  EnhOldNew,
  EnhTitle,
};
