import { formatEther } from 'viem';

export const formatCurrency = (amount: bigint, decimals = 4) => {
  return Number(formatEther(amount)).toFixed(decimals);
};
