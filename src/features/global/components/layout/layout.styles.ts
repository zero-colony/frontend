import styled, { css } from 'styled-components';

const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const ConnectionZoneWrapper = styled.div<{ isReplaced?: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 10;

  ${({ isReplaced }) => {
    if (isReplaced) {
      return css`
        top: 20px;
      `;
    }
  }}
`;

export { ConnectionZoneWrapper, LayoutWrapper };
