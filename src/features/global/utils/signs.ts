export const getSignMessage = (landId: string, avatarId: string) => {
  if (!landId || !avatarId) return null;
  const timestamp = Date.now() / 1000;
  return `MarsColony Pass ${timestamp}`;
};

export const getMiningSignMessage = (landId: string, avatarId: string) => {
  if (!landId || !avatarId) return null;
  const timestamp = Date.now() / 1000;
  return `MarsColony Pass ${timestamp}`;
};
