import React from "react";

const NextTool = ({ nextPage, screenData }) => {
  const active = screenData.idx + 1 < screenData.size;
  const handleClick = () => {
    if (active) {
      nextPage()
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
