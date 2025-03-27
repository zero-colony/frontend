import React from 'react';

export const LinkIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      onClick={onClick}
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.05975 0.755859H1V11.5H11.7806V6.12795V4.35857"
        stroke="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2501 1.49946L7.57163 4.09719L5.70703 5.90555L6.40565 6.62105L8.27025 4.81268L10.9978 2.16743L10.9978 2.89583H11.9995L11.9995 1.49946H12.0004L12.0004 0.501156H11.9995V0.500183L11.3201 0.500183L11.3008 0.480469L11.2805 0.500183L10.9978 0.500182V0.501155L9.59666 0.501155V1.49946L10.2501 1.49946Z"
        fill="white"
      />
    </svg>
  );
};
