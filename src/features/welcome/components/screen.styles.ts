import { fontProperty } from '@global/styles/fonts.styles';
import { WHITE } from '@global/styles/variables';
import styled from 'styled-components';

export const PageScreenPagination = styled.div`
  display: flex;
  position: fixed;
  width: 140px;
  height: 28px;
  left: 133px;
  top: 85%;

  @media screen and (max-width: 425px) {
    left: 100px;
  }
`;

export const HookLink = styled.a<{
  flag?: boolean;
}>`
  ${fontProperty};
  font-size: ${({ flag }) => (flag ? '24px' : '16px')};
  line-height: 28px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${WHITE};
  text-decoration: none;
  margin: 0 2px 0 5px;
`;

export const Line = styled.div`
  border-bottom: 1px solid white;
  width: 80px;
  position: relative;
  height: 20px;
`;
