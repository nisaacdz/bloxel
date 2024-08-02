import React from "react";
import { SCREENS } from "../../screen";

const NextTool = ({ screenIdx, changeScreen }) => {
  const active = screenIdx + 1 < SCREENS.length;
  const handleClick = () => {
    if (active) {
      changeScreen(screenIdx + 1);
    }
  };

  return (
    <button
      id="next-tool"
      className={`simple-btn ${active ? "active" : "inactive"}`}
      title="Next Page"
      onClick={handleClick}
      disabled={!active}
    >
      <img
        className="next-tool-img tool-img"
        src="./next.svg"
        alt="next-tool-btn"
      />
    </button>
  );
};

export default NextTool;
