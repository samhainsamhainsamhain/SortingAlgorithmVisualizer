import React, { useState, useEffect } from "react";
import BubbleSort from "./Algorithms/BubbleSort";
import QuickSort from "./Algorithms/QuickSort";
import { shuffle, arrayIsEqual } from "./Algorithms/Utility";

import "./App.css";

const ARRAY_LENGTH = 3;
const MIN_VALUE = 1;
const MAX_VALUE = 150;
const BAR_COLOR = "rgb(99, 163, 64)";
const SPEED_OF_ALGS = {
  bubble: 1,
  quick: 15,
  bogo: 30,
};

function App() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySteps, setArraySteps] = useState<number[][]>([]);
  const [isAnimating, setIsPlaying] = useState(false);
  const [stepDelay, setStepDelay] = useState<number>(1);
  const [luckyTries, setLuckyTries] = useState(0);

  useEffect(() => {
    generateArray();
  }, []);

  function generateArray() {
    setLuckyTries(0);
    clearSteps();
    const array = [];
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      array.push(
        Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
      );
    }
    setArray(array);
  }

  function mergeSortHandler() {}

  function quickSortHandler() {
    clearSteps();
    setStepDelay(SPEED_OF_ALGS.quick);
    if (arraySteps.length > 0) return;
    const newArraySteps = QuickSort(array);
    return setArraySteps(newArraySteps);
  }

  function bubbleSortHandler() {
    clearSteps();
    if (arraySteps.length > 0) return;
    const newArraySteps = BubbleSort(array);
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
        <button onClick={mergeSortHandler}>Merge Sort</button>
        <button onClick={quickSortHandler}>Quick Sort</button>
        <button onClick={bubbleSortHandler}>Bubble Sort</button>
        <div className="luckyWrapper">
          <button
            className="luckyButton"
            onClick={LuckySortHandler}
            disabled={isAnimating}
          >
            Most effective sorting algorithm*
          </button>
          {/* This one just shuffles current array */}
          <span className="luckyStar">*But you gotta be very lucky</span>
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
