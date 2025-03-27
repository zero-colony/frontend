export const weiToJsNum = (wei: string): number => {
  // wei это кол-во токенов без запятой (умноженное изначально на 1e18)
  let result = wei;

  if (wei.length === 17) {
    result = wei.substr(0, 16) + '0';
  }
  if (result.length === 18) {
    result = wei.substr(0, 16) + '00';
  }
  return parseInt(result) * 1e-18;
};
