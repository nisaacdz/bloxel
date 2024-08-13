import React from "react";

const SlideLeft = ({ onSlideLeft }) => {
  return (
    <button
      id="left-tool"
      className={"simple-btn active"}
      title="More Tools"
      onClick={onSlideLeft}
    >
      <img
        className="left-tool-img tool-img"
        src="./left.svg"
        alt="left-tool-btn"
      />
    </button>
  );
};

export default SlideLeft;
