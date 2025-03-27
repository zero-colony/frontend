import React from 'react';
import styled from 'styled-components';

type Props = {
  upside?: boolean;
  className?: string;
};

export const ArrowDown: React.FC<Props> = ({ upside = false, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={
        !upside
          ? {
              transform: 'rotate(180deg)',
              width: 18,
              height: 18,
            }
          : { width: 18, height: 18, marginBottom: 2 }
      }
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
};

export const ArrowRight = styled(ArrowDown)`
  svg {
    transform: rotate(270deg);
  }
`;

export const ArrowLeft = styled(ArrowDown)`
  svg {
    transform: rotate(90deg);
  }
`;
