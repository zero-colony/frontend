import blockies from 'blockies';

const COLORS: Record<string, [string, string, string, string]> = {
  harmony: ['#dd4', '#745', '#d23', ''],
  hartest: ['#dd4', '#745', '#d23', ''],
  mumbai: ['#803bd4', '#b176ea', '#413f67', '^&'],
  polygon: ['#803bd4', '#b176ea', '#413f67', '^&'],
  fuji: ['#dd4', '#745', '#d23', ''],
  'zero-testnet': ['#b243a6', '#fe5161', '#3f4057', '^&'],
  zero: ['#b243a6', '#fe5161', '#3f4057', '^&'],
};

export const generateBlockie = (id: number, network?: string) => {
  const [color, bgcolor, spotcolor, seedSalt] =
    COLORS[
      network === undefined
        ? import.meta.env.VITE_NETWORK ?? 'harmony'
        : network
    ];
  return blockies({
    // All options are optional
    seed: id.toString() + seedSalt, // seed used to generate icon data, default: random
    color, // to manually specify the icon color, default: random
    bgcolor, // choose a different background color, default: random
    size: 10, // width/height of the icon in blocks, default: 8
    scale: 14, // width/height of each block in pixels, default: 4
    spotcolor, // each pixel has a 13% chance of being of a third color,
    // default: random. Set to -1 to disable it. These "spots" create structures
    // that look like eyes, mouths and noses.
  });
};
