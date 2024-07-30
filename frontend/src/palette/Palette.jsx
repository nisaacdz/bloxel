import "./Palette.css";
import { useState } from "react";
import ChalkTool from "./tools/Chalk/Chalk";
import DusterTool from "./tools/Duster/Duster";
import ClearTool from "./tools/Clear";

const Palette = ({
  colorIdx,
  updateColorIdx,
  designIdx,
  updateDesignIdx,
  updateActiveTool,
  clearDrawingBoard
}) => {
  return (
    <div id="palette">
      <ChalkTool
        colorIdx={colorIdx}
        updateColorIdx={updateColorIdx}
        designIdx={designIdx}
        updateDesignIdx={updateDesignIdx}
        updateActiveTool={updateActiveTool}
      />
      <DusterTool updateActiveTool={updateActiveTool} />
      <ClearTool clearDrawingBoard={clearDrawingBoard}/>
    </div>
  );
};

export default Palette;