import "./Palette.css";
import ChalkTool from "./tools/Chalk/Chalk";
import DusterTool from "./tools/Duster";
import ClearTool from "./tools/Clear";
import NextTool from "./tools/Next";
import PrevTool from "./tools/Prev";
import AddTool from "./tools/Add";
import DelTool from "./tools/Del";

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
      <ClearTool clearDrawingBoard={clearDrawingBoard} />
      <PrevTool changeScreen={changeScreen} screenIdx={screenIdx} />
      <NextTool changeScreen={changeScreen} screenIdx={screenIdx} />
      <AddTool changeScreen={changeScreen} />
      <DelTool screenIdx={screenIdx} setScreen={setScreen} />
    </div>
  );
};

export default Palette;
