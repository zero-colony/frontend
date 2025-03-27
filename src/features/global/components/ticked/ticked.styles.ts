import { fontProperty } from '@global/styles/fonts.styles';
import styled from 'styled-components';

const TickedIconWrapper = styled.svg`
  width: 12px;
  height: 15px;
  fill: none;
`;

const TickedWrapper = styled.div`
  ${fontProperty};
  font-weight: bold;
  font-size: 12px;
  line-height: 30px;

  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  width: 105px;
  height: 30px;
  margin-bottom: 5px;

  span {
    margin-left: 5px;
  }
`;

export { TickedIconWrapper, TickedWrapper };
