import { useEffect, useRef, useState } from "react";
import "./App.css";
import Board from "./board/Board";
import {
  DefaultChalk,
  COLORS,
  DESIGNS,
  BACKGROUNDS,
  DefaultDuster,
} from "./utils";
import Palette from "./palette/Palette";
import Pointer from "./Pointer";
import PageNumber from "./Page";
import { appWindow } from "@tauri-apps/api/window";

function App() {
  const boardRef = useRef(null);
  const paletteRef = useRef(null);
  const [screenData, setScreenData] = useState({ idx: 0, size: 1 });
  const [modifierIdx, setModifierIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [backgroundIdx, setBackgroundIdx] = useState(0);
  const [designIdx, setDesignIdx] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [screenData]);

  const updateBackgroundIdx = (idx) => {
    DefaultDuster.changeBackground(BACKGROUNDS[idx]);
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
    setScreenData(boardRef.current.delPage());
  };

  const addPage = () => {
    setScreenData(boardRef.current.addPage());
  };

  const prevPage = () => {
    setScreenData(boardRef.current.prevPage());
  };

  const nextPage = () => {
    setScreenData(boardRef.current.nextPage());
  };

  const saveData = () => {
    boardRef.current.saveData();
  };

  const handleReset = async () => {
    if (await confirm("Are you sure you want to start a new session?")) {
      DefaultChalk.changeColor(COLORS[0]);
      DefaultChalk.changeDesign(DESIGNS[0]);
      setScreenData(boardRef.current.reset());
      setBackgroundIdx(0);
      setColorIdx(0);
      setDesignIdx(0);
    }
  };

  const withinDrawingZone = (x, y) => {
    return (
      boardRef.current.withinRect(x, y) && !paletteRef.current.withinRect(x, y)
    );
  };

  const handleKeyDown = async (event) => {
    const code = event.keyCode;
    if (code == 70 || code == 102) {
      appWindow.setFullscreen(true);
    } else if (code == 27) {
      appWindow.setFullscreen(false);
    } else if (code == 13) {
      appWindow
        .isFullscreen()
        .then(async (value) => await appWindow.setFullscreen(!value));
    } else if (code == 37) {
      if (screenData.idx > 0) {
        prevPage();
      } else {
        //
      }
    } else if (code == 39) {
      if (screenData.idx + 1 < screenData.size) {
        nextPage();
      } else {
        addPage();
      }
    }
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
        handleReset={handleReset}
      />
      <PageNumber screenData={screenData} />
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
