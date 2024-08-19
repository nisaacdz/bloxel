import React from "react";

const ClearTool = ({ clearDrawingBoard }) => {
  const handleClick = (event) => {
    clearDrawingBoard();
  };
  return (
    <button
      id="clear-tool"
      className="simple-btn active"
      title="clear board"
      onClick={handleClick}
    >
      <img
        className="clear-tool-img tool-img"
        src="./clear.svg"
        alt="clear-img"
      />
    </button>
  );
};

export default ClearTool;
