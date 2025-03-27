import PolygonSymbol3D from '@arcgis/core/symbols/PolygonSymbol3D';

const toRad = (phi: number): number => (phi * Math.PI) / 180;
const toDeg = (phi: number): number => (phi / Math.PI) * 180;

const cos = (value: number): number => Math.cos(toRad(value));
const acos = (value: number): number => toDeg(Math.acos(value));

export const toLongPart = (val: number): number => {
  return val % 150;
};

export const toLatPart = (val: number): number => {
  return Math.floor(val / 150);
};

export const toLong = (val: number): number => {
  return ((val - 150 / 2) / 150) * 360;
};

export const fromLong = (longitude: number): number => {
  return Math.floor((longitude / 360) * 150 + 150 / 2);
};

export const toLat = (val: number): number => {
  if (val === 70) {
    return 0;
  }
  if (val < 70) {
    return 90 - acos(cos(90) + ((70 - val) * (cos(10) - cos(90))) / 70); // > 0
  }
  if (val > 70) {
    return -toLat(140 - val); // < 0
  }
  return 0; // for ts
};

export const fromLat = (latitude: number): number | null => {
  let result: number | null = null;
  if (latitude >= 0) {
    result = Math.floor(
      70 - ((cos(90 - latitude) - cos(90)) * 70) / (cos(10) - cos(90))
    );
  }
  if (latitude < 0) {
    result = Math.floor(139 - (fromLat(-latitude) ?? 0));
  }
  if (result !== null && result >= 0 && result < 140) {
    return result;
  } else {
    return null;
  }
};

export const toTokenNumber = (lat: number, long: number): number | null => {
  const y = fromLat(lat);
  if (y !== null) {
    return y * 150 + fromLong(long) + 1;
  } else {
    return null;
  }
};

export const parseTokenNumber = (
  tokenNumber: number | string | null
): { x: number; y: number } | null => {
  if (tokenNumber === null) {
    return null;
  }
  const y = toLatPart(+tokenNumber - 1);
  const x = toLongPart(+tokenNumber - 1);
  return { x, y };
};

export const simpleFillSymbol = (color: [number, number, number, number]) =>
  new PolygonSymbol3D({
    symbolLayers: [
      {
        type: 'fill',
        material: { color },
      },
    ],
  });

export const formatWallet = (address: string): string => {
  return address.substr(0, 6) + '...' + address.substr(address.length - 6);
};

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
  } catch (err) {}

  document.body.removeChild(textArea);
}

export async function copyTextToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  return navigator.clipboard.writeText(text);
}
