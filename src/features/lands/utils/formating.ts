import { NETWORK_DATA } from '@root/settings';

export const getClnySpeedLabel = (val: string | number | bigint) => {
  return NETWORK_DATA.REVSHARE
    ? ` Max ${val} ${NETWORK_DATA.TOKEN_NAME}/day`
    : `${val} ${NETWORK_DATA.TOKEN_NAME}/day`;
};
