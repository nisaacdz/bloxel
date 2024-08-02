import React from "react";

const PrevTool = ({ screenIdx, changeScreen }) => {
  const active = screenIdx > 0;
  const handleClick = () => {
    if (active) {
      changeScreen(screenIdx - 1);
    }
  };

  return (
    <button
      id="prev-tool"
      className={`simple-btn ${active ? "active" : "inactive"}`}
      title="Previous Page"
      onClick={handleClick}
      disabled={!active}
    >
      <img
        className="prev-tool-img tool-img"
        src="./prev.svg"
        alt="prev-tool-btn"
      />
    </button>
  );
};

export default PrevTool;
