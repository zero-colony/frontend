import React from 'react';
import { WHITE } from '@global/styles/variables';

export const MarketIcon = ({ fill = WHITE }: { fill: string }) => {
  return (
    <svg
      width="34"
      height="33"
      viewBox="0 0 34 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="7.5"
        y1="25.5445"
        x2="26.2"
        y2="25.5445"
        stroke={fill}
        strokeWidth="0.7"
      />
      <path d="M23.8496 6.5L23.8496 25.5" stroke={fill} strokeWidth="0.7" />
      <path d="M12.5 5L12.5 9.89551" stroke={fill} strokeWidth="0.7" />
      <path d="M18.5 5L18.5 9.89551" stroke={fill} strokeWidth="0.7" />
      <path d="M9.5 6.54492H24.2" stroke={fill} strokeWidth="0.7" />
      <rect
        x="9.85"
        y="10.2445"
        width="11.3"
        height="9.3"
        stroke={fill}
        strokeWidth="0.7"
      />
    </svg>
  );
};
