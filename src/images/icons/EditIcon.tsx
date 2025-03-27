import React from 'react';

export const EditIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      onClick={onClick}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6138 5.14403L10.8174 2.34766L0.0341969 13.1695L0 15.9999L2.83037 15.9659L13.6138 5.14403Z"
        fill="white"
      />
      <path
        d="M15.7785 3.01711C16.0726 2.72286 16.0726 2.24611 15.7785 1.95182L14.0474 0.220687C13.7531 -0.0735625 13.2764 -0.0735625 12.9821 0.220687L11.6504 1.55217L14.4468 4.34854L15.7785 3.01711Z"
        fill="white"
      />
    </svg>
  );
};
