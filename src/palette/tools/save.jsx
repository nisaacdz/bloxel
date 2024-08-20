import React from "react";

const SaveTool = ({ saveData }) => {
  return (
    <div
      id="save-tool"
      className="simple-btn inactive"
      title="save presentation"
      onClick={saveData}
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
