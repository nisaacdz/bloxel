import { useRef, useState } from "react";
import "./App.css";
import Board from "./board/Board";
import DefaultChalk from "./padding";


function App() {
  const boardRef = useRef(null);
  const activeMouseRef = useRef(null);
  const [chalk, _] = useState(DefaultChalk);

  const mouseTouchBoard = () => {
    if (boardRef.current != null && activeMouseRef.current != null) {
      const { x: mouseX, y: mouseY } = activeMouseRef.current;
      const board = boardRef.current;
      const trace = chalk.getTrace();

      const boardWidth = board.width();
      const boardHeight = board.height();

      const midi = Math.floor(trace.length / 2);
      const midj = Math.floor(trace[0].length / 2);

      for (let tj = 0; tj < trace.length; tj++) {
        for (let ti = 0; ti < trace[0].length; ti++) {
          const [r1, g1, b1, a] = trace[tj][ti];

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
    
  };

  return (
    <div id="content">
      <Board
        mouseDownHandler={mouseDownHandler}
        mouseMoveHandler={mouseMoveHandler}
        mouseUpHandler={mouseUpHandler}
        mouseLeaveHandler={mouseLeaveHandler}
        ref={boardRef}
      />
    </div>
  );
}

export default App;
