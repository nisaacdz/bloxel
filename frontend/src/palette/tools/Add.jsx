import React from "react";

const AddTool = ({ addPage, screenData }) => {
  const handleClick = () => {
    addPage();
  };

  return (
    <button
      id="add-tool"
      className="simple-btn active"
      title="New Page"
      onClick={handleClick}
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
