import { swap } from "./Utility";

const states: number[] = [];
let arraySteps: number[][] = [];

export default function getQuickSortSteps(array: number[]) {
  arraySteps = [];
  const copy = [...array];
  QuickSort(copy, 0, copy.length - 1);
  console.log(copy, "steps");
  return arraySteps;
}

function QuickSort(
  array: number[],
  start: number = 0,
  end: number = array.length - 1
) {
  arraySteps.push([...array]);
  if (start >= end) {
    return array;
  } else {
    const index = partition(array, start, end);
    states[index] = -1;
    QuickSort(array, start, index - 1);
    QuickSort(array, index + 1, end);
  }
  return;
}

function partition(array: number[], start: number, end: number) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = array[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (array[i] < pivotValue) {
      swap(array, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  swap(array, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }
  return pivotIndex;
}
