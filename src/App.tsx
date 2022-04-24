import React, { useState, useEffect } from "react";
import BubbleSort from "./Algorithms/BubbleSort";
import QuickSort from "./Algorithms/QuickSort";
import { shuffle, arrayIsEqual } from "./Algorithms/Utility";

import "./App.css";

const MIN_VALUE = 1;
const MAX_VALUE = 150;
const BAR_COLOR = "rgb(99, 163, 64)";
const SPEED_OF_ALGS = {
  bubble: 0.5,
  quick: 15,
  bogo: 30,
};

function App() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySteps, setArraySteps] = useState<number[][]>([]);
  const [isAnimating, setIsPlaying] = useState(false);
  const [stepDelay, setStepDelay] = useState<number>(1);
  const [luckyTries, setLuckyTries] = useState(0);
  const [arraySize, setArraySize] = useState(50);

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  function generateArray() {
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

  function mergeSortHandler() {}

  function quickSortHandler() {
    clearSteps();
    setStepDelay(SPEED_OF_ALGS.quick);
    const newArraySteps = QuickSort(array);
    saySteps(newArraySteps);
    return setArraySteps(newArraySteps);
  }

  function bubbleSortHandler() {
    clearSteps();
    setStepDelay(SPEED_OF_ALGS.bubble);
    const newArraySteps = BubbleSort(array);
    saySteps(newArraySteps);
    return setArraySteps(newArraySteps);
  }

  function LuckySortHandler() {
    if (arraySteps.length > 0) {
      generateArray();
    }
    clearSteps();
    setStepDelay(SPEED_OF_ALGS.bogo);
    setLuckyTries(luckyTries + 1);
    if (arraySteps.length > 0) return;
    const sortedArray = [...array];
    sortedArray.sort((a, b) => a - b);
    const newArray = shuffle(array);
    const equality = arrayIsEqual(newArray, sortedArray);
    if (equality) {
      return alert("Congrats! Array is sorted!");
    }
    return setArray(newArray);
  }

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
      }, i * stepDelay);
    }
  }

  function clearSteps() {
    setArraySteps([]);
  }

  function saySteps(newArraySteps: number[][]) {
    console.log(
      "There are " + newArraySteps.length + " steps in current animation"
    );
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
        <div className="luckyWrapper">
          <button
            className="luckyButton"
            onClick={LuckySortHandler}
            disabled={isAnimating}
          >
            Most effective sorting algorithm*
          </button>
          {/* This one just shuffles current array */}
          <span className="luckyStar">*You gotta be very lucky</span>
        </div>
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
