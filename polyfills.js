export default defineNuxtPlugin(() => {
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function (predicate) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
        const o = Object(this);
        const len = o.length >>> 0;
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        const thisArg = arguments[1];
        let k = 0;
        while (k < len) {
          const kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          k++;
        }
        return undefined;
      },
    });
  }

  if (typeof Object.assign !== 'function') {
    Object.defineProperty(Object, 'assign', {
      value: function assign(target, ...varArgs) {
        'use strict';
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        const to = Object(target);
        for (let index = 0; index < varArgs.length; index++) {
          const nextSource = varArgs[index];
          if (nextSource != null) {
            for (const nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true,
    });
  }

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (search, pos) {
      return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    };
  }

  if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }
      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }
});
