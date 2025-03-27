import React from 'react';
import styled from 'styled-components';

export const ZoomIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="11.3738"
        y1="10.6667"
        x2="16"
        y2="15.293"
        stroke="#C4C4C4"
        strokeLinecap="round"
      />
      <circle cx="6.47619" cy="6.47619" r="5.97619" stroke="#C4C4C4" />
    </svg>
  );
};

export const LandPlotZoomIcon = styled(ZoomIcon)`
  position: relative;
  top: 4px;
  left: 6px;
`;
