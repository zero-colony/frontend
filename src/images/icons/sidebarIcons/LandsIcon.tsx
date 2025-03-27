import React from 'react';
import { WHITE } from '@global/styles/variables';

export const LandsIcon = ({ fill = WHITE }: { fill?: string }) => {
  return (
    <svg
      width="34"
      height="33"
      viewBox="0 0 34 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.85908 24.65C6.09535 20.1035 10.9128 16.35 17 16.35C23.0872 16.35 27.9047 20.1035 28.1409 24.65L5.85908 24.65Z"
        stroke={fill}
        strokeWidth="0.7"
      />
      <path
        d="M16.3496 6.75391L16.3496 16.6199"
        stroke={fill}
        strokeWidth="0.7"
      />
      <path
        d="M23.2967 8.63197L25.0699 11.1255H16.35V5.73281H25.0699L23.2967 8.22631L23.1525 8.42914L23.2967 8.63197Z"
        stroke={fill}
        strokeWidth="0.7"
      />
      <line
        x1="9.5"
        y1="18.5445"
        x2="13.5"
        y2="18.5445"
        stroke={fill}
        strokeWidth="0.7"
      />
      <path d="M19.5 22.8945L28 22.8945" stroke={fill} strokeWidth="0.7" />
      <path d="M23.5 17.8945H19" stroke={fill} strokeWidth="0.7" />
      <path d="M10 22.8945L6 22.8945" stroke={fill} strokeWidth="0.7" />
      <path d="M17.5 20.8945H12.5" stroke={fill} strokeWidth="0.7" />
    </svg>
  );
};
