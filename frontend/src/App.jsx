import { useRef, useState } from "react";
import "./App.css";
import Board from "./board/Board";
import { DefaultChalk, DefaultDuster, ChalkVar1, ChalkVar2 } from "./tools";
import Pointer from "./Pointer";

const TOOLS = [DefaultChalk, DefaultDuster, ChalkVar1, ChalkVar2];

function App() {
  const boardRef = useRef(null);
  const pointerToolRef = useRef(null);
  const activeMouseRef = useRef(null);
  const [tool_idx, setToolIdx] = useState(0);

  const escribe = () => {
    if (boardRef.current != null && activeMouseRef.current != null) {
      const [mouseX, mouseY] = boardRef.current.get_bounded_position(
        activeMouseRef.current
      );
      const board = boardRef.current;

      const boardWidth = board.width();
      const boardHeight = board.height();
      const tool = TOOLS[tool_idx];

      const midi = Math.floor(tool.sizeY() / 2);
      const midj = Math.floor(tool.sizeX() / 2);

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

  const pointerMoveHandler = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    if (!boardRef.current.within_bounds(x, y)) {
      pointerToolRef.current.hide();
      return;
    }
    event.preventDefault();
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
      event.preventDefault();
      activeMouseRef.current = { xPos: x, yPos: y };
      escribe();
    }
  };

  const pointerUpHandler = (event) => {
    activeMouseRef.current = null;
  };

  const pointerLeaveHandler = (event) => {
    pointerToolRef.current.hide();
  };

  const changeTool = () => {
    setToolIdx((prevToolIdx) => (prevToolIdx + 1) % TOOLS.length);
  };

  const toolName = TOOLS[tool_idx].name();

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
      <div id="toggle-button" onClick={changeTool}>
        {toolName}
      </div>
      <Pointer ref={pointerToolRef} background={TOOLS[tool_idx]} />
    </div>
  );
}

export default App;
