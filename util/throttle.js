// utils/throttle.js
export function throttle(handlerFunc, timeout = 66) {
  let resizeTimeout = null;

  return function (...args) {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        handlerFunc(...args);
      }, timeout);
    }
  };
}
