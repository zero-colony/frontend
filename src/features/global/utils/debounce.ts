export function debounce(func: any, wait: number, immediate?: boolean) {
  let timeout: any;

  return function executedFunction() {
    // @ts-ignore
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) {
        // @ts-ignore
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
