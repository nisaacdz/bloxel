import React from "react";

const SaveTool = ({ clearDrawingBoard }) => {
  const handleClick = (event) => {
    clearDrawingBoard();
  };
  return (
    <div
      id="save-tool"
      className="simple-btn active"
      title="save presentation"
      onClick={handleClick}
    >
      <img
        className="save-tool-img tool-img"
        src="./save.svg"
        alt="save-img"
      />
    </div>
  );
};

export default SaveTool;
