import {
  useCLNYBalance,
  useEthBalance,
} from '@features/global/hooks/useCallContracts';
import Button from '@global/components/button';
import EthIconImg from '@images/photo/connection-zone-icons/eth.png';
import MarsIconImg from '@images/photo/connection-zone-icons/MarsIcon.png';
import PolygonIconImg from '@images/photo/connection-zone-icons/PolygonIcon.png';
import { ImageIconWrapper } from '@root/images/icons/imageIconWrapper';
import { WalletIcon } from '@root/images/icons/WalletIcon';
import { NETWORK_DATA } from '@root/settings';
import { CURRENT_CHAIN } from '@root/settings/chains';
import { useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectionPopup } from './connectionPopup';
import { ConnectKitButton } from 'connectkit';
import { formatWallet } from '@features/globus/utils/methods';

export const ConnectionZone = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { address, isDisconnected, isConnecting, isReconnecting } =
    useAccount();

  const { clnyBalance } = useCLNYBalance();
  const { ethBalance } = useEthBalance();

  const handleTogglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  if (isDisconnected) {
    return (
      <ConnectKitButton.Custom>
        {({ show }) => (
          <Button
            connectButton={true}
            text="Connect wallet"
            variant="common"
            onClick={() => show?.()}
          />
        )}
      </ConnectKitButton.Custom>
    );
  }

  if (isConnecting || isReconnecting) {
    return <div>Connecting...</div>;
  }

  return (
    <div className="flex fixed top-6 sm:top-5 left-0 right-0 h-fit justify-center sm:justify-end sm:pr-5 w-screen">
      <div
        id="headerInfo"
        ref={triggerRef}
        onClick={handleTogglePopup}
        className="px-[6px] pl-4 sm:pl-[22px]  py-[6px] box-border shadow-[0_0_4px_rgba(0,0,0,0.25)] backdrop-blur-md flex justify-between gap-4 sm:gap-[30px] font-bold text-xs leading-[14px] text-white cursor-pointer bg-[#2e2e34] rounded-[10px] items-center w-fit select-none"
      >
        {/* CLNY Balance */}

        <div className="flex gap-2 items-center whitespace-nowrap">
          <ImageIconWrapper src={MarsIconImg} dimension="14px" />
          <span>
            {clnyBalance ?? 0} {NETWORK_DATA.TOKEN_NAME}
          </span>
        </div>

        {/* ETH/MATIC Balance */}
        <div className="flex gap-2 items-center whitespace-nowrap">
          <ImageIconWrapper
            src={CURRENT_CHAIN.ticker === 'MATIC' ? PolygonIconImg : EthIconImg}
            dimension="14px"
          />
          <span>
            {ethBalance} {CURRENT_CHAIN.ticker}
          </span>
        </div>

        {/* Wallet */}
        <div className="flex gap-2 items-center">
          <div className="bg-[#1c1c1f] rounded-[6px] flex gap-2 px-4 sm:px-8 py-2">
            <WalletIcon />
            <span className="text-primary hidden sm:block">
              {formatWallet(address, 6)}
            </span>
            <span className="text-primary sm:hidden">
              {formatWallet(address, 4)}
            </span>
          </div>
        </div>
      </div>

      <ConnectionPopup
        address={address}
        triggerRef={triggerRef}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </div>
  );
};
