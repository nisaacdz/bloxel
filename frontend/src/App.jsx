import { useRef, useState } from "react";
import "./App.css";
import Board from "./board/Board";
import { DefaultChalk, COLORS, DESIGNS } from "./chalks";
import Pointer from "./Pointer";
import Palette from "./palette/Palette";

function App() {
  const boardRef = useRef(null);
  const pointerToolRef = useRef(null);
  const activeMouseRef = useRef(null);
  const [screenIdx, setScreenIdx] = useState(0);
  const [activeTool, setActiveTool] = useState(DefaultChalk);
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

  const updateActiveTool = (tool) => {
    setActiveTool(tool);
  };

  const escribe = () => {
    if (boardRef.current != null && activeMouseRef.current != null) {
      const [mouseX, mouseY] = boardRef.current.get_bounded_position(
        activeMouseRef.current
      );
      const board = boardRef.current;

      const boardWidth = board.width();
      const boardHeight = board.height();
      const tool = activeTool;

      const midi = Math.floor(tool.sizeX() / 2);
      const midj = Math.floor(tool.sizeY() / 2);

      for (let tj = 0; tj < tool.sizeY(); tj++) {
        for (let ti = 0; ti < tool.sizeX(); ti++) {
          const [r1, g1, b1, a] = tool.idx(tj, ti);

          const ni = mouseX + ti - midi;
          const nj = mouseY + tj - midj;

          if (ni >= 0 && ni < boardWidth && nj >= 0 && nj < boardHeight) {
            const [r2, g2, b2] = board.getPixelColor(ni, nj);

            const f1 = a / 255;
            const f2 = 1.0 - f1;

            const r = f1 * r1 + f2 * r2;
            const g = f1 * g1 + f2 * g2;
            const b = f1 * b1 + f2 * b2;

            board.setPixelColor(ni, nj, [
              Math.floor(r),
              Math.floor(g),
              Math.floor(b),
            ]);
          }
        }
      }
    }
  };

  const pointerMoveHandler = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    if (!boardRef.current.within_bounds(x, y)) {
      pointerToolRef.current.hide();
      return;
    }
    event.stopPropagation();
    pointerToolRef.current.show();
    pointerToolRef.current.reposition(x, y);
    if (
      activeMouseRef.current != null &&
      (activeMouseRef.current.x !== x || activeMouseRef.current.y !== y)
    ) {
      activeMouseRef.current = { xPos: x, yPos: y };
      escribe();
    }
  };

  const pointerDownHandler = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    if (event.button == 0 && boardRef.current.within_bounds(x, y)) {
      event.stopPropagation();
      activeMouseRef.current = { xPos: x, yPos: y };
      escribe();
    }
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

  const pointerUpHandler = (event) => {
    activeMouseRef.current = null;
  };

  const pointerLeaveHandler = (event) => {
    pointerToolRef.current.hide();
  };

  return (
    <div
      id="content"
      draggable="false"
      onTouchStart={pointerDownHandler}
      onTouchMove={pointerMoveHandler}
      onTouchEnd={pointerUpHandler}
      onTouchCancel={pointerLeaveHandler}
      onPointerDown={pointerDownHandler}
      onPointerMove={pointerMoveHandler}
      onPointerUp={pointerUpHandler}
      onPointerLeave={pointerLeaveHandler}
      onPointerCancel={pointerLeaveHandler}
    >
      <Board ref={boardRef} />
      <Palette
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
        ref={pointerToolRef}
        colorIdx={colorIdx}
        designIdx={designIdx}
        activeTool={activeTool}
      />
    </div>
  );
}

export default App;
