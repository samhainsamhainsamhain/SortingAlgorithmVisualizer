import { swap } from "./Utility";

export default function BubbleSort(array: number[]) {
    let newArray: number[] = [...array];
    const newArraySteps = [];
    for (let i = 0; i < newArray.length - 1; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        if (newArray[j] > newArray[j + 1]) {
          newArray = swap(newArray, j, j + 1);
        }
        newArraySteps.push(newArray.slice());
      }
      newArraySteps.push(newArray.slice());
    }
    return newArraySteps;
  }