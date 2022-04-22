import React, { useState, useEffect } from "react";

import "./App.css";

const ARRAY_LENGTH = 50;
const MIN_VALUE = 1;
const MAX_VALUE = 150;
const BAR_COLOR = "rgb(99, 163, 64)";
const STEP_DELAY = 1;

function App() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySteps, setArraySteps] = useState<number[][]>([]);
  const [isAnimating, setIsPlaying] = useState(false);

  useEffect(() => {
    generateArray();
  }, []);

  function generateArray() {
    clearSteps()
    const array = [];
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      array.push(
        Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
      );
    }
    setArray(array);
  }

  function mergeSort() {}

  function quickSort() {}

  function bubbleSort(array: number[]) {
    clearSteps()
    if (arraySteps.length > 0) return;
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
    return setArraySteps(newArraySteps);
  }

  function jsSort() {}

  function animateSorting() {
    if (isAnimating || !(arraySteps.length > 0)) return;
    setIsPlaying(true);
    arrayNextStep();
  }

  function arrayNextStep() {
    for (let i = 0; i < arraySteps.length; i++) {
      setTimeout(() => {
        setArray(arraySteps[i]);
        i++;
        if (i === arraySteps.length - 1) {
          setIsPlaying(false);
          console.log("Sorting animation has ended");
        }
      }, i * STEP_DELAY);
    }
    // console.log(!isPlaying)
    // setIsPlaying(false)
  }

  function swap(array: number[], a: number, b: number) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    return array;
  }

  function clearSteps() {
    setArraySteps([]);
  }

  return (
    <div className="App">
      <div className="barContainer">
        {array
          ? array.map((barHeight, index) => (
              <div
                key={index}
                className="bar"
                style={{
                  backgroundColor: `${BAR_COLOR}`,
                  height: `${2 * barHeight}px`,
                  width: `${100 / ARRAY_LENGTH}%`,
                  maxWidth: `10px`,
                }}
              ></div>
            ))
          : null}
      </div>
      <div className="controlPanel">
        <button onClick={generateArray}>Generate new Array</button>
        <button onClick={mergeSort}>Merge Sort</button>
        <button onClick={quickSort}>Quick Sort</button>
        <button onClick={() => bubbleSort(array)}>Bubble Sort</button>
        <button onClick={jsSort}>JS Sort</button>
        <button onClick={animateSorting} disabled={isAnimating}>
          Animate
        </button>
        <button
          onClick={() => {
            console.log(array);
            console.log(arraySteps);
          }}
        >
          Check Array
        </button>
      </div>
    </div>
  );
}

export default App;
