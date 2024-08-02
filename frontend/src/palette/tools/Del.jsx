import React from "react";
import { SCREENS } from "../../screen";

const DelTool = ({ screenIdx, setScreen }) => {
  const handleClick = () => {
    SCREENS.splice(screenIdx, 1);
    const idx = screenIdx > 0 ? screenIdx - 1 : 0;
    setScreen(idx);
  };
  return (
    <div
      id="del-tool"
      className="simple-btn active"
      title="delete page"
      onClick={handleClick}
    >
      <img className="del-tool-img tool-img" src="./del.svg" alt="del-img" />
    </div>
  );
};

export default DelTool;
