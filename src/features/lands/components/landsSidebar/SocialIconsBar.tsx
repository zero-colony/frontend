import React from 'react';

const SocialIconsBar = () => {
  return (
    <div className="flex gap-4 justify-center w-full items-center pb-0">
      <a
        href="https://x.com/zero_colony_fun"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/icons/x.svg" alt="X (Twitter)" />
      </a>
      {/* <a
        href="https://docs.colonylab.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/icons/docs.svg" alt="Documentation" />
      </a> */}
      <a
        href="https://github.com/zero-colony"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/icons/github.svg" alt="GitHub" />
      </a>
      {/* <a
        href="https://discord.gg/colonylab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/icons/discord.svg" alt="Discord" />
      </a> */}
      <a
        href="https://t.me/zerocolonychannel"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/icons/telegram.svg"
          alt="Telegram"
          style={{ width: '18px', height: '18px' }}
        />
      </a>
    </div>
  );
};

export default SocialIconsBar;
