import React, { useState, useEffect } from "react";

import "./App.css";

const ARRAY_LENGTH = 100;
const MIN_VALUE = 10;
const MAX_VALUE = 100;
const BAR_COLOR = "rgb(99, 163, 64)";

function App() {
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    generateArray();
  }, []);

  function generateArray() {
    const array = [];
    for (let i = 0; i < ARRAY_LENGTH; i++) {
      array.push(
        Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
      );
    }
    setArray(array);
  }

  return (
    <div className="App">
      <div className="container">
        {array.map((barHeight, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default App;
