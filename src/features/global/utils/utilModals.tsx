import React from 'react';
import { GAP_TEXT } from '@global/constants';
import { CommonButton } from '@root/legacy/buttons/commonButton';
import { CURRENT_CHAIN } from '@root/settings/chains';

const wrongChainToast = (onChainSwitch: () => Promise<void>) => (
  <>
    <div>{GAP_TEXT}</div>
    <div>Current app works only with {CURRENT_CHAIN.name}</div>
    <div>{GAP_TEXT}</div>
    <div style={{ textAlign: 'center' }}>
      <CommonButton
        onClick={() => onChainSwitch()}
        text="Switch chain"
        style={{ marginLeft: '20px', marginRight: 0 }}
      />
    </div>
    <div>{GAP_TEXT}</div>
  </>
);

export { wrongChainToast };
