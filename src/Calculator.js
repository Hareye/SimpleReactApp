import "./App.css";
import React, { useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";
import { evaluate } from "mathjs";

function Calculator() {
  const [input, setInput] = useState("");

  const addToInput = (val) => {
    if (input.slice(-1) === "." && val === ".") {
      // Does not allow for multiple decimal inputs in a row
    } else {
      setInput(input + val);
    }
  };

  const handleEqual = () => {
    setInput(String(evaluate(input)));
  };

  return (
    <div className="main">
      <div className="calculator">
        <Input input={input}></Input>
        <div className="row">
          <Button handleClick={addToInput}>7</Button>
          <Button handleClick={addToInput}>8</Button>
          <Button handleClick={addToInput}>9</Button>
          <Button handleClick={addToInput}>/</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>4</Button>
          <Button handleClick={addToInput}>5</Button>
          <Button handleClick={addToInput}>6</Button>
          <Button handleClick={addToInput}>*</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>1</Button>
          <Button handleClick={addToInput}>2</Button>
          <Button handleClick={addToInput}>3</Button>
          <Button handleClick={addToInput}>+</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>.</Button>
          <Button handleClick={addToInput}>0</Button>
          <Button handleClick={() => handleEqual()}>=</Button>
          <Button handleClick={addToInput}>-</Button>
        </div>
        <div className="row">
          <ClearButton handleClear={() => setInput("")}>Clear</ClearButton>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
