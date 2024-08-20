import { useEffect, useRef, useState } from "react";
import "./App.css";
import Board from "./board/Board";
import {
  DefaultChalk,
  COLORS,
  DESIGNS,
  BACKGROUNDS,
  DefaultDuster,
  ChalkSizes,
} from "./utils";
import Palette from "./palette/Palette";
import Pointer from "./Pointer";
import PageNumber from "./Page";
import { appWindow } from "@tauri-apps/api/window";

const PREMIUM_WALL_MESSAGE =
  "You need to buy the premium version of this software to access this feature!";
const RESET_SESSSION_MESSAGE = "Are you sure you want to start a new session?";
const CLOSE_APP_MESSAGE =
  "Are you sure you want to close this app? \nAll unsaved data will be lost!";

function App() {
  const boardRef = useRef(null);
  const paletteRef = useRef(null);
  const [screenData, setScreenData] = useState({ idx: 0, size: 1 });
  const [modifierIdx, setModifierIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [backgroundIdx, setBackgroundIdx] = useState(0);
  const [designIdx, setDesignIdx] = useState(0);
  const [chalkSizeIdx, setChalkSizeIdx] = useState(1);

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

  const updateChalkSizeIdx = (idx) => {
    DefaultChalk.changeScale(ChalkSizes[idx]);
    setChalkSizeIdx(idx);
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
    alert(PREMIUM_WALL_MESSAGE);
  };

  const handleReset = async () => {
    if (await confirm(RESET_SESSSION_MESSAGE)) {
      setScreenData(boardRef.current.reset());
      updateBackgroundIdx(0);
      updateColorIdx(0);
      updateDesignIdx(0);
      updateChalkSizeIdx(1);
    }
  };

  const handleRestore = () => {
    appWindow
      .isFullscreen()
      .then(async (value) => await appWindow.setFullscreen(!value));
  };

  const handleLeave = async () => {
    if (await confirm(CLOSE_APP_MESSAGE)) {
      await appWindow.close();
    }
  };

  const handleSettings = async () => {
    alert(PREMIUM_WALL_MESSAGE);
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
        // Do nothing
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
        sizeIdx={chalkSizeIdx}
        updateColorIdx={updateColorIdx}
        updateDesignIdx={updateDesignIdx}
        updateSizeIdx={updateChalkSizeIdx}
        clearDrawingBoard={clearDrawingBoard}
        screenData={screenData}
        delPage={delPage}
        addPage={addPage}
        nextPage={nextPage}
        prevPage={prevPage}
        saveData={saveData}
        handleReset={handleReset}
        handleLeave={handleLeave}
        handleRestore={handleRestore}
        handleSettings={handleSettings}
      />
      <PageNumber screenData={screenData} />
      <Pointer
        toolIdx={modifierIdx}
        colorIdx={colorIdx}
        designIdx={designIdx}
        sizeIdx={chalkSizeIdx}
        backgroundIdx={backgroundIdx}
        withinDrawingZone={withinDrawingZone}
      />
    </div>
  );
}

export default App;
