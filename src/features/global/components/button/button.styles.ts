import { fontProperty } from '@global/styles/fonts.styles';
import { BLACK, TOXIC_GREEN } from '@global/styles/variables';
import { ButtonVariantsType } from '@global/types';
import styled, { css } from 'styled-components';

const ButtonWrapper = styled.button<{
  variant: ButtonVariantsType;
  connectButton?: boolean;
}>`
  ${fontProperty};
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  border: none;
  outline: none;
  text-transform: uppercase;
  padding: 8px 40px;
  cursor: pointer;
  color: ${BLACK};

  &:disabled {
    cursor: not-allowed;
  }

  ${({ variant }) => {
    if (variant === 'common') {
      return css`
        background-color: ${TOXIC_GREEN};
        border-radius: 6px;
      `;
    }

    if (variant === 'ghost') {
      return css`
        color: ${TOXIC_GREEN};
        background-color: transparent;
      `;
    }
  }}

  ${({ connectButton }) => {
    if (connectButton) {
      return css`
        background-color: ${TOXIC_GREEN};
        border-radius: 8px;
        padding: 8px 28px;
      `;
    }
  }}
`;

export { ButtonWrapper };
