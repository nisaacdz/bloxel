import React from "react";

const DelTool = ({ delPage, screenData }) => {
  const handleClick = () => {
    delPage();
  };
  return (
    <button
      id="del-tool"
      className="simple-btn active"
      title="delete page"
      onClick={handleClick}
    >
      <img className="del-tool-img tool-img" src="./del.svg" alt="del-img" />
    </button>
  );
};

export default DelTool;
