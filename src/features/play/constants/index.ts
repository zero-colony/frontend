import { WHITE } from '@global/styles/variables';
import { extractURLParam } from '@global/utils/urlParams';

const MINING_PREPARE_MOBILE_BP = 1245;

const MINING_PREPARE_WIDTH = 1070;

const MINING_PREPARE_BORDER = `1px solid ${WHITE}`;

const GEAR_CATEGORIES = {
  engines: '0',
  drills: '1',
  scanners: '2',
  transmitters: '3',
  transports: '4'
};

const SELECT_GEAR_BUTTON_ID = 'select-gear-confirm';

const TRANSPORT_DIRECTIONS = {
  left: 'left',
  right: 'right',
  up: 'up',
  down: 'down'
};

const INITIAL_GAME_TIME = 1200;
const DEFAULT_WIDTH = 960;
const DEFAULT_HEIGHT = 800;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 2400;
const TILE_SIZE = 160;

const MAX_MOVES_LIMIT = () => {
  // @ts-ignore
  const engineGear = extractURLParam(window.location, 'engines');
  // @ts-ignore
  const roverId = extractURLParam(window.location, 'transportId');

  if (!engineGear) return 125;

  let count;

  switch (engineGear) {
    case '0':
      count = 129;
      break;
    case '1':
      count = 131;
      break;
    case '2':
      count = 135;
      break;
    default:
      count = 125;
      break;
  }

  if (roverId === '14') {
    count = count + 15;
  }

  return count;
};

const MAX_DYNAMITES_LIMIT = () => {
  // @ts-ignore
  const transportId = extractURLParam(window.location, 'transportId');
  if (!transportId) return 125;

  switch (transportId) {
    case '13':
      return '3';
    default:
      return '1';
  }
};

const MAP_SIZE = { width: 3360, height: 2400 };
const TILES_WIDTH = 21;
const Y_POS_DIFF = 2;

export {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  GEAR_CATEGORIES,
  INITIAL_GAME_TIME,
  MAP_SIZE,
  MAX_DYNAMITES_LIMIT,
  MAX_HEIGHT,
  MAX_MOVES_LIMIT,
  MAX_WIDTH,
  MINING_PREPARE_BORDER,
  MINING_PREPARE_MOBILE_BP,
  MINING_PREPARE_WIDTH,
  SELECT_GEAR_BUTTON_ID,
  TILE_SIZE,
  TILES_WIDTH,
  TRANSPORT_DIRECTIONS,
  Y_POS_DIFF
};
