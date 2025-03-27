const apiRetry = async (
  triesCount: number,
  url: string,
  successCondition: string
) => {
  while (triesCount--) {
    const result = await fetch(url);
    const data = await result.json();
    if (data[successCondition]) {
      break;
    }
    await new Promise((rs) => setTimeout(rs, 1000));
  }
};

export default apiRetry;
