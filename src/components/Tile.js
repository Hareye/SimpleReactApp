import React, { useContext } from "react";
import MinesweeperContext from "./MinesweeperContext";

function Tile(props) {
  const style = {
    width: "20px",
    height: "20px",
    border: "1px solid #000",
    backgroundColor: "#b8b8b8",
  };

  const { state, dispatch } = useContext(MinesweeperContext);

  const changeExpose = (newExpose) => {
    dispatch({
      type: "EXPOSE",
      height: props.height,
      width: props.width,
      data: newExpose,
    });
  };

  const renderNumber = () => {
    if (
      state[props.height][props.width].mine === true &&
      state[props.height][props.width].exposed === true
    ) {
      return "M";
    } else if (state[props.height][props.width].exposed === true) {
      return state[props.height][props.width].value;
    } else {
      return ".";
    }
  };

  return (
    <div
      className="tile"
      style={style}
      onClick={() => {
        changeExpose(true);
        props.tileClick(props.height, props.width);
      }}
    >
      {renderNumber()}
    </div>
  );
}

export default Tile;
