export const fromWeiValue = (amount: string, digits?: number) => {
  if (amount === '...') return '...';
  return (parseInt(amount) * 1e-18).toFixed(digits ?? 0);
};
