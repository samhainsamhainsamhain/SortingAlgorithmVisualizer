let arraySteps: number[][] = [];

export default function getMergeSortSteps(array: number[]) {
  arraySteps = [];
  const copy = [...array];
  const length = copy.length;
  const aux = Array(length);
  mergeSortHelper(copy, aux, 0, length - 1);
  return arraySteps;
}

function mergeSortHelper(
  array: number[],
  aux: number[],
  left: number,
  right: number
) {
  if (right <= left) return;
  const mid = left + Math.floor((right - left) / 2);
  mergeSortHelper(array, aux, left, mid);
  mergeSortHelper(array, aux, mid + 1, right);
  merge(array, aux, left, mid, right);
  arraySteps.push([...array]);
}

function merge(
  array: number[],
  aux: number[],
  left: number,
  mid: number,
  right: number
) {
  for (let i = left; i <= right; i++) aux[i] = array[i];
  let i = left;
  let j = mid + 1;
  for (let k = left; k <= right; k++) {
    if (i > mid) {
      array[k] = aux[j++];
    } else if (j > right) {
      array[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      array[k] = aux[j++];
    } else {
      array[k] = aux[i++];
    }
  }
}
