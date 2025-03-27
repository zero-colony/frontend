import { COMMON_POST_PAYLOAD } from '@global/constants';

export const getDefaultPostPayload = (data: Record<string, any>) => {
  return {
    body: JSON.stringify(data),
    ...COMMON_POST_PAYLOAD
  };
};
