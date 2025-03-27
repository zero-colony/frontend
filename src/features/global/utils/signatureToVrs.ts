export const signatureToVrs = (str: string) => {
  const r = '0x' + str.substring(2).substring(0, 64);
  const s = '0x' + str.substring(2).substring(64, 128);
  const v = '0x' + str.substring(2).substring(128, 130);

  return { r, s, v };
};
