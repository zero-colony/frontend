import React from 'react';
import { WHITE } from '@global/styles/variables';

export const ProfileIcons = ({ stroke = WHITE }: { stroke: string }) => {
  return (
    <svg
      width="34"
      height="33"
      viewBox="0 0 34 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="9.85"
        y="4.35"
        width="14.66"
        height="14.66"
        rx="7.33"
        stroke={stroke}
        strokeWidth="0.7"
      />
      <path
        d="M24 14C25.6569 14 27 12.8807 27 11.5C27 10.1193 25.6569 9 24 9"
        stroke={stroke}
        strokeWidth="0.7"
      />
      <path
        d="M10.5 14C8.84315 14 7.5 12.8807 7.5 11.5C7.5 10.1193 8.84315 9 10.5 9"
        stroke={stroke}
        strokeWidth="0.7"
      />
      <path
        d="M28.5 27V27C28.5 22.5817 24.9183 19 20.5 19H17H13.5C9.08172 19 5.5 22.5817 5.5 27V27"
        stroke={stroke}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <path
        d="M11.85 11.5C11.85 8.93188 13.9319 6.85 16.5 6.85H17.9C20.4681 6.85 22.55 8.93188 22.55 11.5C22.55 14.0681 20.4681 16.15 17.9 16.15H17.2H16.5C13.9319 16.15 11.85 14.0681 11.85 11.5Z"
        stroke="white"
        strokeWidth="0.7"
      />
      <rect
        x="11.85"
        y="22.35"
        width="10.3"
        height="5.3"
        rx="0.65"
        stroke={stroke}
        strokeWidth="0.7"
      />
      <path
        d="M25.8496 6V9.41066"
        stroke={stroke}
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
};
