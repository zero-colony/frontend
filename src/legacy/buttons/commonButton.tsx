import React, { CSSProperties } from 'react';
import { fontProperty } from '@global/styles/fonts.styles';
import styled, { css } from 'styled-components';

type CommonButtonType = {
  text: string;
  onClick: (e: any) => void;
  isPending?: boolean;
  height?: string;
  isGhost?: boolean;
  mt?: number;
  mb?: number;
  pendingText?: string;
  style?: CSSProperties;
  additionalClass?: string;
  disabled?: boolean;
  id?: string;
};

const StyledCommonButton = styled.button<{ isGhost?: boolean }>`
  outline: none;
  text-transform: uppercase;
  cursor: pointer;

  border: none;
  mix-blend-mode: normal;

  font-family: 'Play', sans-serif;

  &:not([disabled]):hover {
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 0px 20px #fe5161);
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }

  ${({ isGhost }) => {
    if (isGhost) {
      return css`
        color: #fe5161;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        width: 100%;
        border: none;
        background-color: transparent;

        &:disabled {
          color: #acadb9;
        }
      `;
    } else {
      return css`
        ${fontProperty};
        color: #36363d;
        line-height: 30px;
        width: 100%;
        background: #fe5161;
        font-family: 'Play', sans-serif;

        &:disabled {
          color: #36363d;
          background: linear-gradient(90deg, #f5f0f0 -3.55%, #a4a5b2 107.42%);
        }
      `;
    }
  }};
`;

export const CommonButton = ({
  text,
  isPending,
  pendingText,
  onClick,
  height,
  mt,
  mb,
  isGhost,
  style,
  additionalClass,
  disabled,
  id
}: CommonButtonType) => {
  return (
    <StyledCommonButton
      isGhost={isGhost}
      onClick={onClick}
      style={{ height, marginBottom: mb, marginTop: mt, ...style }}
      disabled={isPending || disabled}
      className={additionalClass}
      id={id}
    >
      {isPending ? pendingText ?? 'Pending...' : text}
    </StyledCommonButton>
  );
};
