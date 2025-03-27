import React from 'react';
import { TOXIC_GREEN } from '@global/styles/variables';

import { TickedIconWrapper, TickedWrapper } from './ticked.styles';

type Props = {
  text: string;
  color?: string;
};

export const Ticked: React.FC<Props> = ({ text, color = TOXIC_GREEN }) => {
  return (
    <TickedWrapper>
      <TickedIconWrapper viewBox="0 0 15 12" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.6781 4.84836C1.27219 4.47386 0.639532 4.49932 0.265029 4.90523C-0.109475 5.31115 -0.0840118 5.9438 0.321902 6.3183L1.6781 4.84836ZM6.87097 11L6.19287 11.735C6.40387 11.9296 6.68837 12.0242 6.97393 11.9947C7.25949 11.9651 7.51858 11.8143 7.68523 11.5805L6.87097 11ZM14.8143 1.58049C15.1349 1.13079 15.0302 0.506332 14.5805 0.185734C14.1308 -0.134863 13.5063 -0.030199 13.1857 0.419507L14.8143 1.58049ZM0.321902 6.3183L6.19287 11.735L7.54907 10.265L1.6781 4.84836L0.321902 6.3183ZM7.68523 11.5805L14.8143 1.58049L13.1857 0.419507L6.0567 10.4195L7.68523 11.5805Z"
          fill={color}
        />
      </TickedIconWrapper>
      <span>{text}</span>
    </TickedWrapper>
  );
};
