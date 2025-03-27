import React from 'react';
import { ChainData } from '@root/settings/chains';
import BN from 'bn.js';
import { PromiEvent } from 'web3-core';
import { Contract } from 'web3-eth-contract';

let callsLastMinute = 0;

const increaseCallCounter = () => {
  callsLastMinute++;
  setTimeout(() => callsLastMinute--, 60 * 1000);
};

setInterval(() => {
  console.info(`${callsLastMinute} blockchain queries last minute`);
}, 60 * 1000);

export const callWrapper = async function <T = string | BN>(
  contract: Contract,
  data: {
    method: string;
    params?: unknown[];
    from: string;
    type: '0x2' | undefined;
    onFail?: () => void | Promise<void>;
    errorText?: string;
    // нужно только если есть errorText
    addToast?: (
      data: string | React.ReactNode,
      params: Record<string, string>
    ) => void;
    overrideDefault?: T;
  }
): Promise<T | undefined> {
  const {
    method,
    params = [],
    from,
    type,
    onFail,
    errorText,
    addToast,
    overrideDefault
  } = data;
  for (let i = 0; i < 4; i++) {
    try {
      increaseCallCounter();
      return await contract.methods[method](...params).call({ from, type });
    } catch (error) {
      console.error(contract.options.address, method, '!!!', params);
      await new Promise((rs) => setTimeout(rs, 666));
    }
  }

  await onFail?.()?.catch(() => {}); // проглотим потенциальную ошибку в onFail
  if (errorText && addToast) {
    addToast(errorText, { appearance: 'error' });
  }
  return overrideDefault;
};

export const txWrapper = (
  tx: PromiEvent<Contract>,
  params: {
    onPending?: (hash: string) => void;
    onConfirm?: (data: Contract) => void;
    onFail?: (error: string) => void;
    eventName: string;
    addToast: (
      data: string | React.ReactNode,
      params: Record<string, string>
    ) => void;
    success?: string;
    pending?: string;
    chainData: ChainData;
  }
) => {
  const { onPending, onConfirm, onFail, eventName, addToast } = params;
  let errorFired = false;
  tx.on('transactionHash', (hash: string) => {
    addToast(
      <>
        [PENDING] {params.pending ?? eventName}{' '}
        <a
          href={params.chainData.explorer + '/tx/' + hash}
          target="_blank"
          rel="noreferrer"
        >
          see on {params.chainData.name}
        </a>
      </>,
      { appearance: 'info' }
    );
    onPending?.(hash);
  });
  tx.then((data) => {
    addToast(params.success ?? `[SUCCESS] ${eventName}`, {
      appearance: 'success'
    });
    onConfirm?.(data);
  });
  tx.catch((error: Error) => {
    if (errorFired) {
      return;
    }
    errorFired = true;
    addToast(
      params.success ??
        `[ERROR] ${eventName}: ${error.message ?? error.toString()}`,
      { appearance: 'error' }
    );
    onFail?.(error.message ?? error.toString());
    console.log(error);
  });
  tx.on('error', (err) => {
    if (errorFired) {
      return;
    }
    errorFired = true;
    addToast(params.success ?? `[ERROR] ${eventName}`, { appearance: 'error' });
    onFail?.('Tx failed');
    console.log(err);
  });
};
