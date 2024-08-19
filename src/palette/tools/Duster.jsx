import React from "react";

const DusterTool = ({ updateActiveTool }) => {
  const handleClick = () => {
    updateActiveTool(1);
  };
  return (
    <button
      id="duster-tool"
      className="simple-btn active"
      title="duster"
      onClick={handleClick}
    >
      <img
        className="duster-tool-img tool-img"
        src="./duster.svg"
        alt="duster-img"
      />
    </button>
  );
};

export default DusterTool;
