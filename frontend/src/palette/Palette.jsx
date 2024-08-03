import "./Palette.css";
import ChalkTool from "./tools/Chalk/Chalk";
import DusterTool from "./tools/Duster";
import ClearTool from "./tools/Clear";
import NextTool from "./tools/Next";
import PrevTool from "./tools/Prev";
import AddTool from "./tools/Add";
import DelTool from "./tools/Del";
import React, { useState } from "react";
import Draggable from "react-draggable";

const Palette = ({
  colorIdx,
  updateColorIdx,
  designIdx,
  updateDesignIdx,
  updateActiveTool,
  clearDrawingBoard,
  screenIdx,
  changeScreen,
  setScreen,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const onCollapse = (event) => {
    handleClick(event);
    setCollapsed(true);
  };

  const onExpand = (event) => {
    handleClick(event);
    setCollapsed(false);
  };
  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  if (collapsed) {
    return (
      <Draggable>
        <div id="palette-collapsed" onClick={handleClick}>
          <button className="palette-resizer" onClick={onExpand}>
            <img src="./max.svg" alt="maximize palette" />
          </button>
        </div>
      </Draggable>
    );
  }
  return (
    <Draggable>
      <div id="palette" onClick={handleClick}>
        <ChalkTool
          colorIdx={colorIdx}
          updateColorIdx={updateColorIdx}
          designIdx={designIdx}
          updateDesignIdx={updateDesignIdx}
          updateActiveTool={updateActiveTool}
        />
        <DusterTool updateActiveTool={updateActiveTool} />
        <ClearTool clearDrawingBoard={clearDrawingBoard} />
        <PrevTool changeScreen={changeScreen} screenIdx={screenIdx} />
        <NextTool changeScreen={changeScreen} screenIdx={screenIdx} />
        <AddTool changeScreen={changeScreen} />
        <DelTool screenIdx={screenIdx} setScreen={setScreen} />
        <button className="palette-resizer" onClick={onCollapse}>
          <img src="./min.svg" alt="minimize palette" />
        </button>
      </div>
    </Draggable>
  );
};

export default Palette;
