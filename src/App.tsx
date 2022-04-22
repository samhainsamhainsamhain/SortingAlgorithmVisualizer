import React, { useState } from "react";

import "./App.css";

const ARRAY_LENGTH = 50;
const MIN_VALUE = 10;
const MAX_VALUE = 100;

function App() {
  const [array, setArray] = useState<number[]>([]);

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
      hello!
    </div>
  );
}

export default App;
