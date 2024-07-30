import React from "react";

const ClearTool = ({clearDrawingBoard}) => {
  const handleClick = (event) => {
    clearDrawingBoard()
  };
  return (
    <div id="clear-tool" title="clear board" onClick={handleClick}>
      <img className="clear-tool-img" src="./clear.svg" alt="clear-img"></img>
    </div>
  );
};

export default ClearTool;
