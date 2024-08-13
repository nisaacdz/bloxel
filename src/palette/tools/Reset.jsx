import React from "react";

const ResetTool = ({ handleReset }) => {
  return (
    <button
      id="reset-tool"
      className={"simple-btn active"}
      title="restart session"
      onClick={handleReset}
    >
      <img
        className="reset-tool-img tool-img"
        src="./reset.svg"
        alt="reset-tool-btn"
      />
    </button>
  );
};

export default ResetTool;
