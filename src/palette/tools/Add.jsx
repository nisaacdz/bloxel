import React from "react";

const AddTool = ({ addPage, screenData }) => {
  return (
    <button
      id="add-tool"
      className="simple-btn active"
      title="New Page"
      onClick={addPage}
    >
      <img
        className="add-tool-img tool-img"
        src="./add.svg"
        alt="add-tool-btn"
      />
    </button>
  );
};

export default AddTool;
