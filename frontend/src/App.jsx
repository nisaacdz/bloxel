import { useRef, useState } from "react";
import "./App.css";
import Board from "./board/Board";
import {
  DefaultChalk,
  COLORS,
  DESIGNS,
  BACKGROUNDS,
  MODIFIERS,
} from "./utils";
import Palette from "./palette/Palette";
import Pointer from "./Pointer";

function App() {
  const boardRef = useRef(null);
  const paletteRef = useRef(null);
  const [screenData, setScreenData] = useState({ idx: 0, size: 1 });
  const [modifierIdx, setModifierIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [backgroundIdx, setBackgroundIdx] = useState(0);
  const [designIdx, setDesignIdx] = useState(0);

  const updateBackgroundIdx = (idx) => {
    MODIFIERS[1].changeBackground(BACKGROUNDS[idx]);
    setBackgroundIdx(idx);
  };

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

  const clearDrawingBoard = () => {
    boardRef.current.clearBoard();
  };

  const delPage = () => {
    setScreenData(boardRef.current.delPage())
  }

  const addPage = () => {
    setScreenData(boardRef.current.addPage())
  }

  const prevPage = () => {
    setScreenData(boardRef.current.prevPage())
  }

  const nextPage = () => {
    setScreenData(boardRef.current.nextPage())
  }

  const saveData = () => {
    boardRef.current.saveData();
  }

  const withinDrawingZone = (x, y) => {
    return (
      boardRef.current.withinRect(x, y) && !paletteRef.current.withinRect(x, y)
    );
  };

  return (
    <div id="content">
      <Board
        ref={boardRef}
        toolIdx={modifierIdx}
        backgroundIdx={backgroundIdx}
      />
      <Palette
        ref={paletteRef}
        updateActiveTool={updateActiveTool}
        backgroundIdx={backgroundIdx}
        updateBackgroundIdx={updateBackgroundIdx}
        colorIdx={colorIdx}
        designIdx={designIdx}
        updateColorIdx={updateColorIdx}
        updateDesignIdx={updateDesignIdx}
        clearDrawingBoard={clearDrawingBoard}
        screenData={screenData}
        delPage={delPage}
        addPage={addPage}
        nextPage={nextPage}
        prevPage={prevPage}
        saveData={saveData}
      />
      <Pointer
        toolIdx={modifierIdx}
        colorIdx={colorIdx}
        designIdx={designIdx}
        backgroundIdx={backgroundIdx}
        withinDrawingZone={withinDrawingZone}
      />
    </div>
  );
}

export default App;
