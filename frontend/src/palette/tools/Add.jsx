import React from "react";
import { SCREENS } from "../../screen";

const AddTool = ({ changeScreen }) => {
  const handleClick = () => {
    changeScreen(SCREENS.length);
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
