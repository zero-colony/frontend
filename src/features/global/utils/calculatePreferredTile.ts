export const calculatePreferredTile = (
  xTileCoord: number,
  yTileCoord: number,
  sceneTileWidthDimension: number = 250,
  sceneTileHeightDimension: number = 250
) => {
  const xPixels =
    Math.floor(xTileCoord * sceneTileWidthDimension) -
    sceneTileWidthDimension / 2;
  const yPixels =
    Math.floor(yTileCoord * sceneTileHeightDimension) -
    sceneTileHeightDimension / 2;
  return [xPixels, yPixels];
};
