import React, { useState, useEffect } from "react";
import BubbleSort from "./Algorithms/BubbleSort";
import QuickSort from "./Algorithms/QuickSort";
import MergeSort from "./Algorithms/MergeSort";
import { shuffle, arrayIsEqual } from "./Algorithms/Utility";

import "./App.css";

const MIN_VALUE = 1;
const MAX_VALUE = 150;
const BAR_COLOR = {
  freshArray: "rgb(128, 128, 128)",
  inProgress: "rgb(189, 179, 23)",
  sorted: "rgb(63, 174, 54)",
};
const SPEED_OF_ALGS = {
  bubble: 1,
  quick: 30,
  lucky: 30,
  merge: 30,
};

function App() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySteps, setArraySteps] = useState<number[][]>([]);
  const [isAnimating, setIsPlaying] = useState(false);
  const [stepDelay, setStepDelay] = useState<number>(1);
  const [luckyTries, setLuckyTries] = useState(0);
  const [arraySize, setArraySize] = useState(50);
  const [barColor, setBarColor] = useState(BAR_COLOR.freshArray);

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  useEffect(() => {
    animateSorting();
  }, [arraySteps]);

  function generateArray() {
    setBarColor(BAR_COLOR.freshArray);
    setLuckyTries(0);
    clearSteps();
    const array = [];
    for (let i = 0; i < arraySize; i++) {
      array.push(
        Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
      );
    }
    setArray(array);
  }

  function changeArraySizeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setArraySize(Number(event.currentTarget.value));
  }

  function mergeSortHandler() {
    setArray(shuffle(array));
    clearSteps();
    setStepDelay(SPEED_OF_ALGS.merge);
    if (arraySteps.length > 0) return;
    const newArraySteps = MergeSort(array);
    return setArraySteps(newArraySteps);
  }

  function quickSortHandler() {
    setArray(shuffle(array));
    clearSteps();
    setStepDelay(SPEED_OF_ALGS.quick);
    if (arraySteps.length > 0) return;
    const newArraySteps = QuickSort(array);
    return setArraySteps(newArraySteps);
  }

  function bubbleSortHandler() {
    setArray(shuffle(array));
    clearSteps();
    if (arraySize <= 50) {
      setStepDelay(SPEED_OF_ALGS.bubble * 3);
    } else if (arraySize > 80) {
      setStepDelay(SPEED_OF_ALGS.bubble);
    } else {
      setStepDelay(SPEED_OF_ALGS.bubble * 2);
    }
    if (arraySteps.length > 0) return;
    const newArraySteps = BubbleSort(array);
    setArraySteps(newArraySteps);
  }

  function LuckySortHandler() {
    if (arraySteps.length > 0) {
      generateArray();
    }
    clearSteps();
    setBarColor(BAR_COLOR.inProgress);
    setStepDelay(SPEED_OF_ALGS.lucky);
    setLuckyTries(luckyTries + 1);
    if (arraySteps.length > 0) return;
    const sortedArray = [...array];
    sortedArray.sort((a, b) => a - b);
    const newArray = shuffle(array);
    const arraysEquality = arrayIsEqual(newArray, sortedArray);
    if (arraysEquality) {
      setBarColor(BAR_COLOR.sorted);
      return alert("Congrats! Array is sorted!");
    }
    return setArray(newArray);
  }

  function animateSorting() {
    if (isAnimating || !(arraySteps.length > 0)) return;
    setIsPlaying(true);
    setBarColor(BAR_COLOR.inProgress);
    arrayNextStep();
  }

  function arrayNextStep() {
    for (let i = 0; i < arraySteps.length; i++) {
      setTimeout(() => {
        setArray(arraySteps[i]);
        i++;
        if (i === arraySteps.length - 1) {
          setIsPlaying(false);
          setBarColor(BAR_COLOR.sorted);
          clearSteps();
          console.log(
            "Sorting animation has ended in " + arraySteps.length + " steps"
          );
        }
      }, i * stepDelay);
    }
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
                  backgroundColor: `${barColor}`,
                  height: `${2 * barHeight}px`,
                  width: `${100 / arraySize}%`,
                  maxWidth: `10px`,
                }}
              ></div>
            ))
          : null}
      </div>
      <div className="controlPanel">
        <div className="SliderWrapper">
          <input
            onChange={changeArraySizeHandler}
            disabled={isAnimating}
            type="range"
            min="10"
            defaultValue="50"
            max="100"
            step="1"
            id="arraySize"
          />
          <label htmlFor="arraySize">Size of array: {arraySize}</label>
        </div>
        <button onClick={generateArray} disabled={isAnimating}>
          Generate new Array
        </button>
        <button onClick={mergeSortHandler} disabled={isAnimating}>
          Merge Sort
        </button>
        <button onClick={quickSortHandler} disabled={isAnimating}>
          Quick Sort
        </button>
        <button onClick={bubbleSortHandler} disabled={isAnimating}>
          Bubble Sort
        </button>
        <button
          className="luckyButton"
          onClick={LuckySortHandler}
          disabled={isAnimating}
        >
          Lucky Sorting
        </button>
      </div>
    </div>
  );
}

export default App;
