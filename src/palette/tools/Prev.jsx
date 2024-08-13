import React from "react";

const PrevTool = ({ prevPage, screenData }) => {
  const active = screenData.idx > 0;
  const handleClick = () => {
    if (active) {
      prevPage()
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
