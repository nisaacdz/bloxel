import React from "react";

const FullScreen = ({ handleRestore }) => {
  return (
    <button
      id="restore-tool"
      className={"simple-btn active"}
      title="Toggle fullscreen"
      onClick={handleRestore}
    >
      <img
        className="restore-tool-img tool-img"
        src="./restore.svg"
        alt="restore-tool-btn"
      />
    </button>
  );
};

export default FullScreen;