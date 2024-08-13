import React from "react";

const SlideRight = ({ onSlideRight }) => {
  return (
    <button
      id="right-tool"
      className={"simple-btn active"}
      title="More Tools"
      onClick={onSlideRight}
    >
      <img
        className="right-tool-img tool-img"
        src="./right.svg"
        alt="right-tool-btn"
      />
    </button>
  );
};

export default SlideRight;
