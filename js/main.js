function getRandomNumber(min, max) {
/* Returns a random number from min to max, both included.*/
  if (min > max) {
    throw new RangeError('Wrong range. Argument min should be lower then max');
  }

  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function ifStringShort(string, size) {
/* Returns true if string is shorter then size, and false otherwise. */
  return String(string).length <= size;
}

