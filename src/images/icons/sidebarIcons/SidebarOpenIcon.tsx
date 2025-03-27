import React from 'react';

export const SidebarOpenIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      onClick={onClick}
      width="13"
      height="9"
      viewBox="0 0 13 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0.5" y1="0.5" x2="12.5" y2="0.5" stroke="white" />
      <line x1="0.5" y1="4.5" x2="12.5" y2="4.5" stroke="white" />
      <line x1="0.5" y1="8.5" x2="12.5" y2="8.5" stroke="white" />
    </svg>
  );
};
