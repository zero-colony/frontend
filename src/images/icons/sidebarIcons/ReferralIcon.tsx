import React from 'react';
import { WHITE } from '@global/styles/variables';

export const ReferralIcon = ({ fill = WHITE }: { fill: string }) => {
  return (
    <svg
      width="34"
      height="33"
      viewBox="0 0 34 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="17.5" cy="8" r="3.65" stroke={fill} strokeWidth="0.7" />
      <circle cx="8" cy="21.5" r="3.15" stroke={fill} strokeWidth="0.7" />
      <circle cx="17" cy="21.5" r="3.15" stroke={fill} strokeWidth="0.7" />
      <circle cx="26" cy="21.5" r="3.15" stroke={fill} strokeWidth="0.7" />
      <line
        x1="17.2504"
        y1="11.5"
        x2="17.2504"
        y2="18.5"
        stroke={fill}
        strokeWidth="0.7"
      />
      <line
        x1="25.85"
        y1="13.8945"
        x2="25.85"
        y2="18.3945"
        stroke={fill}
        strokeWidth="0.7"
      />
      <line
        x1="7.85"
        y1="13.8945"
        x2="7.85"
        y2="18.3945"
        stroke={fill}
        strokeWidth="0.7"
      />
      <line
        x1="7.5"
        y1="13.5445"
        x2="26.2"
        y2="13.5445"
        stroke={fill}
        strokeWidth="0.7"
      />
    </svg>
  );
};
