import { useRef, useState } from "react";
import "./App.css";
import Board from "./board/Board";
import { DefaultChalk, DefaultDuster } from "./tools";
import Pointer from "./Pointer";

const TOOLS = [DefaultChalk, DefaultDuster];

function App() {
  const boardRef = useRef(null);
  const pointerToolRef = useRef(null);
  const activeMouseRef = useRef(null);
  const [tool_idx, setToolIdx] = useState(0);

  const mouseTouchBoard = () => {
    if (boardRef.current != null && activeMouseRef.current != null) {
      const { x: mouseX, y: mouseY } = activeMouseRef.current;
      const board = boardRef.current;

      const boardWidth = board.width();
      const boardHeight = board.height();
      const tool = TOOLS[tool_idx];

      const midi = Math.floor(tool.sizeX() / 2);
      const midj = Math.floor(tool.sizeY() / 2);

      for (let tj = 0; tj < tool.sizeX(); tj++) {
        for (let ti = 0; ti < tool.sizeY(); ti++) {
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

  const mouseMoveHandler = (x, y) => {
    if (
      x >= 0 &&
      y >= 0 &&
      x < boardRef.current.width() &&
      y < boardRef.current.height()
    ) {
      pointerToolRef.current.show();
      pointerToolRef.current.translate(x, y);
    } else {
      pointerToolRef.current.hide();
    }
    if (
      activeMouseRef.current != null &&
      (activeMouseRef.current.x !== x || activeMouseRef.current.y !== y)
    ) {
      activeMouseRef.current = { x: x, y: y };
      mouseTouchBoard();
    }
  };

  const mouseDownHandler = (x, y) => {
    activeMouseRef.current = { x: -1, y: -1 };
    mouseMoveHandler(x, y);
  };

  const mouseUpHandler = () => {
    activeMouseRef.current = null;
  };

  const mouseLeaveHandler = () => {
    pointerToolRef.current.hide();
  };

  const changeTool = () => {
    setToolIdx((prevToolIdx) => (prevToolIdx + 1) % TOOLS.length);
  };

  const toolName = tool_idx === 0 ? "Chalk" : "Duster";

  return (
    <div id="content" draggable="false">
      <Board
        mouseDownHandler={mouseDownHandler}
        mouseMoveHandler={mouseMoveHandler}
        mouseUpHandler={mouseUpHandler}
        mouseLeaveHandler={mouseLeaveHandler}
        ref={boardRef}
      />
      <div id="toggle-button" onClick={changeTool}>
        {toolName}
      </div>
      <Pointer ref={pointerToolRef} background={TOOLS[tool_idx]} />
    </div>
  );
}

export default App;
