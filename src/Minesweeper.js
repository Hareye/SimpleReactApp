import "./index.css";
import Board from "./components/Board";
import React, { useState } from "react";

function Minesweeper() {
  const [level, setLevel] = useState("");
  const [mines, setMines] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  const buttonHandler = (e) => {
    if (e.target.innerText === "Easy") {
      setLevel("Easy");
      setHeight(10);
      setWidth(10);
      setMines(10);
      document.getElementById("levels").style.display = "none";
    } else if (e.target.innerText === "Medium") {
      setLevel("Medium");
      setHeight(16);
      setWidth(16);
      setMines(40);
      document.getElementById("levels").style.display = "none";
    } else if (e.target.innerText === "Hard") {
      setLevel("Hard");
      setHeight(16);
      setWidth(30);
      setMines(99);
      document.getElementById("levels").style.display = "none";
    }
  };

  return (
    <div className="main">
      <div className="levels" id="levels">
        <button className="easy-level" onClick={buttonHandler}>
          Easy
        </button>
        <button className="medium-level" onClick={buttonHandler}>
          Medium
        </button>
        <button className="hard-level" onClick={buttonHandler}>
          Hard
        </button>
      </div>
      <div className="win-message" id="win-message">
        <h1>You Win!</h1>
      </div>
      <div className="lose-message" id="lose-message">
        <h1>You Lose!</h1>
      </div>
      <div className="game">
        <Board level={level} mines={mines} height={height} width={width} />
      </div>
    </div>
  );
}

export default Minesweeper;
