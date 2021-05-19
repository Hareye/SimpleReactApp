import React, { useReducer } from "react";
import Tile from "./Tile";
import MinesweeperContext from "./MinesweeperContext";
import "../index.css";

// To Do: Change it so first click is not a mine and is a 0

// boardArr = [key, mine(true/false), number(surrounding mines), exposed(true/false)]

const center = 960; // body center px from index.css
const tileSize = 20;

var height;
var width;
var boardArr = [];
var exposedArr = [];

var alreadyWon = false;
var alreadyLost = false;

function reducer(state, action) {
  switch (action.type) {
    case "EXPOSE":
      return state.map((row) => {
        return row.map((tile) =>
          tile.height === action.height && tile.width === action.width
            ? { ...tile, exposed: action.data }
            : tile
        );
      });
    default:
    //return boardArr;
  }
}

function exposeAdjacent(tile, dispatch) {
  // Top
  if (tile[0] - 1 >= 0) {
    expose([tile[0] - 1, tile[1]], dispatch);
  }
  // Bot
  if (tile[0] + 1 < height) {
    expose([tile[0] + 1, tile[1]], dispatch);
  }
  // Left
  if (tile[1] - 1 >= 0) {
    expose([tile[0], tile[1] - 1], dispatch);
  }
  // Right
  if (tile[1] + 1 < width) {
    expose([tile[0], tile[1] + 1], dispatch);
  }
  // Top Left
  if (tile[0] - 1 >= 0 && tile[1] - 1 >= 0) {
    expose([tile[0] - 1, tile[1] - 1], dispatch);
  }
  // Top Right
  if (tile[0] - 1 >= 0 && tile[1] + 1 < width) {
    expose([tile[0] - 1, tile[1] + 1], dispatch);
  }
  // Bot Left
  if (tile[0] + 1 < height && tile[1] - 1 >= 0) {
    expose([tile[0] + 1, tile[1] - 1], dispatch);
  }
  // Bot Right
  if (tile[0] + 1 < height && tile[1] + 1 < width) {
    expose([tile[0] + 1, tile[1] + 1], dispatch);
  }
}

function expose(tile, dispatch) {
  if (
    boardArr[tile[0]][tile[1]].mine === false &&
    boardArr[tile[0]][tile[1]].value === 0 &&
    !exposedArr.includes(boardArr[tile[0]][tile[1]])
  ) {
    dispatch({
      type: "EXPOSE",
      height: tile[0],
      width: tile[1],
      data: true,
    });
    exposedArr.push(boardArr[tile[0]][tile[1]]);
    exposeAdjacent([tile[0], tile[1]], dispatch);
  } else if (
    boardArr[tile[0]][tile[1]].mine === false &&
    boardArr[tile[0]][tile[1]].value !== 0 &&
    !exposedArr.includes(boardArr[tile[0]][tile[1]])
  ) {
    dispatch({
      type: "EXPOSE",
      height: tile[0],
      width: tile[1],
      data: true,
    });
    exposedArr.push(boardArr[tile[0]][tile[1]]);
  }
}

function Board(props) {
  var styleWidth = props.width * tileSize;
  const style = {
    width: String(styleWidth + "px"),
    marginLeft: String(center - styleWidth / 2 + "px"),
  };

  var key = 0;
  var tiles = [];
  var mines = [];

  height = props.height;
  width = props.width;

  const createBoard = () => {
    for (var i = 0; i < height; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        var obj = {
          key: key,
          mine: false,
          value: 0,
          exposed: false,
          height: i,
          width: j,
        };
        row.push(obj);
        key++;
      }
      boardArr.push(row);
    }
    console.log("Board created!");
    //console.log(boardArr);
  };

  const generateMines = () => {
    for (var i = 0; i < props.mines; i++) {
      var randomHeight = Math.floor(Math.random() * height);
      var randomWidth = Math.floor(Math.random() * width);
      var found = false;
      do {
        // Prevent multiple mines from being generated on the same tile
        for (var j = 0; j < mines.length; j++) {
          if (mines[j][0] === randomHeight && mines[j][1] === randomWidth) {
            found = true;
            randomHeight = Math.floor(Math.random() * height);
            randomWidth = Math.floor(Math.random() * width);
            break;
          } else {
            found = false;
          }
        }
      } while (found === true);
      mines.push([randomHeight, randomWidth]);
      boardArr[randomHeight][randomWidth].mine = true;
    }
    console.log("Mines generated!");
  };

  const populateNumbers = () => {
    var minX, minY, maxX, maxY;
    for (var i = 0; i < mines.length; i++) {
      // Set the values used to loop in order to increment the values in each tile surrounding the mines
      // Ex. There is a mine in [1][1]                                Ex. There is a mine in [0][0]
      // minX = 0, maxX = 2, minY = 0, maxY = 2                       minX = 0, maxX = 1, minY = 0, maxY = 1
      // [0][0] [0][1] [0][2]                                         [0][0] [0][1]
      // [1][0] [1][1] [1][2]                                         [1][0] [1][1]
      // [2][0] [2][1] [2][2]
      // Numbers in each of these tiles will be incremented by 1      Numbers in each of these tiles will be incremented by 1
      if (mines[i][0] - 1 >= 0) {
        minY = mines[i][0] - 1;
      } else {
        minY = mines[i][0];
      }
      if (mines[i][1] - 1 >= 0) {
        minX = mines[i][1] - 1;
      } else {
        minX = mines[i][1];
      }
      if (mines[i][0] + 1 < height) {
        maxY = mines[i][0] + 1;
      } else {
        maxY = mines[i][0];
      }
      if (mines[i][1] + 1 < width) {
        maxX = mines[i][1] + 1;
      } else {
        maxX = mines[i][1];
      }
      for (var j = minY; j <= maxY; j++) {
        for (var k = minX; k <= maxX; k++) {
          boardArr[j][k].value++;
        }
      }
    }
    console.log("Numbers populated!");
  };

  const createTiles = () => {
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        tiles.push(
          <Tile
            key={state[i][j].key}
            height={i}
            width={j}
            tileClick={tileClick}
          ></Tile>
        );
      }
    }
    console.log("Tiles created!");
  };

  const tileClick = (h, w) => {
    var win = 1;
    expose([h, w], dispatch);
    if (boardArr[h][w].mine === true && alreadyWon === false) {
      // Lose functionality here
      document.getElementById("lose-message").style.display = "block";
      alreadyLost = true;
    } else {
      for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
          if (
            boardArr[i][j].mine === false &&
            boardArr[i][j].exposed === false
          ) {
            win = 0;
            break;
          }
        }
        if (win === 0) {
          break;
        }
      }
      if (win === 1 && alreadyLost === false) {
        // Win functionality here
        document.getElementById("win-message").style.display = "block";
        alreadyWon = true;
      }
    }
  };

  if (boardArr.length === 0) {
    createBoard();
    generateMines();
    populateNumbers();
  }

  const [state, dispatch] = useReducer(reducer, boardArr);
  createTiles();

  return (
    <div className="board" style={style}>
      <MinesweeperContext.Provider value={{ state, dispatch }}>
        {tiles}
      </MinesweeperContext.Provider>
    </div>
  );
}

export default Board;
