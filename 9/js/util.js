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


export {getRandomPositiveInteger, checkStringLength, isEsc};