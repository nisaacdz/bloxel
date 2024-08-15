import React from "react";

const LeaveApp = ({ handleLeave }) => {
  return (
    <button
      id="leave-tool"
      className={"simple-btn active"}
      title="Close App"
      onClick={handleLeave}
    >
      <img
        className="leave-tool-img tool-img"
        src="./leave.svg"
        alt="leave-tool-btn"
      />
    </button>
  );
};

export default LeaveApp;