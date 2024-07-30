import "./Palette.css";
import { useState } from "react";
import ChalkTool from "./tools/Chalk/Chalk";
import DusterTool from "./tools/Duster/Duster";

const Palette = ({
  colorIdx,
  updateColorIdx,
  designIdx,
  updateDesignIdx,
  updateActiveTool,
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
    </div>
  );
};

export default Palette;