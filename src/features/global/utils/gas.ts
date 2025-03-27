import { NETWORK_DATA } from '@root/settings';

const formatRequestWrapperPayload = async (address?: string) => {
  let options: Record<string, any> = { from: address ?? window.address };
  if (typeof NETWORK_DATA.GAS_FUNC === 'function') {
    options.gasPrice = await NETWORK_DATA.GAS_FUNC();
  }
  return options;
};

export { formatRequestWrapperPayload };
