export function swap(array: number[], a: number, b: number) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
  return array;
}
