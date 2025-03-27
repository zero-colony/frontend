import Ethereum from '@api/etheriumWeb3';
import { generateBlockie } from '@global/utils/blockie.canvas';
import { callWrapper } from '@global/utils/tx-wrapper';
import { BN } from '@harmony-js/crypto';
import { CURRENT_CHAIN } from '@root/settings/chains';
import React from 'react';
// @ts-ignore
import { createRoot } from 'react-dom/client';
import Web3 from 'web3';

const externalState: {
  fee: number | null;
} = {
  fee: null,
};

type Props = {
  longitudes: [number, number];
  latitudes: [number, number];
  token: number;
  occupied: boolean;
  balance: number;
  currency: string;
  claim: Function;
  address: string;
};

const PopupFeesSection: React.FC<Props> = ({
  longitudes,
  latitudes,
  token,
  occupied,
  balance,
  currency,
  claim,
  address,
}) => {
  // здесь редакс не получится использовать, потому что ниже свой ReactDOM.render вне общего контекста
  const [fee, setFee] = React.useState(externalState.fee);
  const gm = Ethereum.getGameManager();

  React.useEffect(() => {
    if (!fee && !occupied) {
      callWrapper<string | BN>(gm, {
        method: 'getFee',
        addToast: () => {},
        errorText: 'Fail getting claiming fees',
        params: [1],
        from: address,
        type: CURRENT_CHAIN.x2,
      }).then((_fee) => {
        if (_fee && +_fee) {
          externalState.fee = +Web3.utils.fromWei(_fee, 'ether');
          setFee(externalState.fee);
        }
      });
    }
  }, [address]);

  return (
    <>
      {!occupied && fee && (
        <div>
          Fee: {fee} {currency}
        </div>
      )}
      {!occupied && !fee && <div>Loading fees...</div>}
      <div>
        <div className="popup__geo">
          Longitudes {longitudes[0].toFixed(2)} .. {longitudes[1].toFixed(2)}
          <br />
          Latitudes {latitudes[0].toFixed(2)} .. {latitudes[1].toFixed(2)}
        </div>
      </div>
      {!occupied && (
        <button
          className="popup__claim"
          id="claim"
          disabled={!!(fee && balance < +fee)}
          onClick={() => claim([token])}
        >
          CLAIM NOW
        </button>
      )}
      {fee && balance < +fee && !occupied && (
        <div className="popup__insuf">insufficient balance</div>
      )}
    </>
  );
};

export const buildPopup = async ({
  longitudes,
  latitudes,
  token,
  occupied,
  balance,
  currency,
  claim,
  address,
}: Props) => {
  console.log('buildPopup', {
    longitudes,
    latitudes,
    token,
    occupied,
    balance,
    currency,
    claim,
    address,
  });

  const popupNode = document.createElement('div');
  createRoot(popupNode).render(
    <div className="popup">
      <div className="popup__column" id="token_pic">
        <img
          src={generateBlockie(token).toDataURL()}
          alt={'Land Plot #' + token.toString()}
        />
      </div>
      <div className="popup__column">
        <div>Status: {occupied ? 'Occupied' : 'Available'}</div>
        <PopupFeesSection
          longitudes={longitudes}
          latitudes={latitudes}
          token={token}
          occupied={occupied}
          balance={balance}
          currency={currency}
          claim={claim}
          address={address}
        />
      </div>
    </div>
  );
  return popupNode;
};
