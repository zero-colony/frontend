import BN from 'bn.js';

const bn = (n: number): BN => new BN(n.toString());

export const maxUint256 = bn(2).pow(bn(256).sub(bn(1)));

export const halfUint256 = maxUint256.div(bn(2));
