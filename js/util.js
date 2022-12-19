const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const checkStringLength = (string, size) => {
  /* Returns true if string is shorter then size, and false otherwise. */
  return String(string).length <= size;
}

const isEsc = (event) => event.key === 'Escape';


// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle(callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}


function getRandomUniqueElements(arr, n) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};




export { getRandomPositiveInteger, checkStringLength, isEsc, debounce, throttle, getRandomUniqueElements };
