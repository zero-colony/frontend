function secondsToDhms(seconds: number) {
  seconds = Number(seconds);
  let d = Math.floor(seconds / (3600 * 24));
  let h = Math.floor((seconds % (3600 * 24)) / 3600);
  let m = Math.floor((seconds % 3600) / 60);

  let dDisplay = d > 0 ? d + 'D : ' : '0D';
  let hDisplay = h > 0 ? h + `${m > 0 ? 'H : ' : 'H'}` : '00H';
  let mDisplay = m > 0 ? m + 'M' : '00M';
  return dDisplay + hDisplay + mDisplay;
}

export default secondsToDhms;
