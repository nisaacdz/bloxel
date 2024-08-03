import { useRef, useState } from "react";
import "./App.css";
import Board from "./board/Board";
import { DefaultChalk, COLORS, DESIGNS } from "./utils";
import Palette from "./palette/Palette";
import Pointer from "./Pointer";

function App() {
  const boardRef = useRef(null);
  const paletteRef = useRef(null);
  const [screenIdx, setScreenIdx] = useState(0);
  const [modifierIdx, setModifierIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [designIdx, setDesignIdx] = useState(0);

  const updateColorIdx = (idx) => {
    DefaultChalk.changeColor(COLORS[idx]);
    setColorIdx(idx);
  };

  const updateDesignIdx = (idx) => {
    DefaultChalk.changeDesign(DESIGNS[idx]);
    setDesignIdx(idx);
  };

  const updateActiveTool = (idx) => {
    setModifierIdx(idx);
  };

  const changeScreen = (idx) => {
    // The caller of this function must guarantee that idx is within range [0, SCREENS.length]
    setScreenIdx(idx);
    boardRef.current.changePage(idx);
  };

  const setScreen = (idx) => {
    // The caller of this function must guarantee that idx is within range [0, SCREENS.length]
    setScreenIdx(idx);
    boardRef.current.setPage(idx);
  };

  const clearDrawingBoard = () => {
    boardRef.current.clearAll();
  };

  const withinDrawingZone = (x, y) => {
    return (
      boardRef.current.withinRect(x, y) && !paletteRef.current.withinRect(x, y)
    );
  };

  return (
    <div id="content">
      <Board ref={boardRef} toolIdx={modifierIdx} />
      <Palette
        ref={paletteRef}
        updateActiveTool={updateActiveTool}
        colorIdx={colorIdx}
        designIdx={designIdx}
        updateColorIdx={updateColorIdx}
        updateDesignIdx={updateDesignIdx}
        clearDrawingBoard={clearDrawingBoard}
        screenIdx={screenIdx}
        changeScreen={changeScreen}
        setScreen={setScreen}
      />
      <Pointer
        toolIdx={modifierIdx}
        colorIdx={colorIdx}
        designIdx={designIdx}
        withinDrawingZone={withinDrawingZone}
      />
    </div>
  );
}

export default App;
