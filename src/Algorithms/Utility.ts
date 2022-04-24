export function swap(array: number[], a: number, b: number) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
  return array;
}

export function shuffle(array: number[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export function arrayIsEqual(array: number[], sortedArray: number[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== sortedArray[i]) {
      return false;
    }
  }
  return true;
}
