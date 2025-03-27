import {
  parseTokenNumber,
  toLat,
  toLong,
} from '@features/globus/utils/methods';

const navigateToGlobeLand = (event: MouseEvent, id: number) => {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  const { x, y } = parseTokenNumber(id) ?? { x: 0, y: 0 };
  if (window.navigateToToken) {
    window.navigateToToken(id);
  } else {
    view
      .goTo({
        tilt: 0.2,
        center: [toLong(x), toLat(y)],
      })
      .catch((error: Error) => console.error(error));
  }
};

export { navigateToGlobeLand };
