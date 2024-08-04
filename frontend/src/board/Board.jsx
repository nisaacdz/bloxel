import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import "./Board.css";
import { BACKGROUNDS, MODIFIERS } from "../utils";

const SCREENS = [null];

function escribe(activeMouseRef, contextRef, toolIdx) {
  if (activeMouseRef.current != null) {
    const { xPos: mouseX, yPos: mouseY } = activeMouseRef.current;

    const boardWidth = contextRef.current.canvas.width;
    const boardHeight = contextRef.current.canvas.height;
    const tool = MODIFIERS[toolIdx];

    const midi = Math.floor(tool.sizeX() / 2);
    const midj = Math.floor(tool.sizeY() / 2);

    for (let tj = 0; tj < tool.sizeY(); tj++) {
      for (let ti = 0; ti < tool.sizeX(); ti++) {
        const [r1, g1, b1, a] = tool.idx(tj, ti);

        const ni = mouseX + ti - midi;
        const nj = mouseY + tj - midj;

        if (ni >= 0 && ni < boardWidth && nj >= 0 && nj < boardHeight) {
          const [r2, g2, b2] = contextRef.current.getImageData(
            ni,
            nj,
            1,
            1
          ).data;

          const f1 = a / 255;
          const f2 = 1.0 - f1;

          const r = f1 * r1 + f2 * r2;
          const g = f1 * g1 + f2 * g2;
          const b = f1 * b1 + f2 * b2;

          const imageData = contextRef.current.getImageData(ni, nj, 1, 1);
          const pixel = imageData.data;
          pixel[0] = Math.floor(r);
          pixel[1] = Math.floor(g);
          pixel[2] = Math.floor(b);
          contextRef.current.putImageData(imageData, ni, nj);
        }
      }
    }
  }
}

const Board = forwardRef(({ toolIdx, backgroundIdx }, ref) => {
  const activeMouseRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const screenIdx = useRef(0);

  useEffect(() => {
    onstart();
    window.addEventListener("resize", onresize);
    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, [backgroundIdx]);

  useImperativeHandle(
    ref,
    () => ({
      clearBoard: () => {
        clearCanvas();
      },
      delPage: () => {
        SCREENS.splice(screenIdx.current, 1);
        if (SCREENS.length == 0) SCREENS.push(null);
        const newIdx = Math.max(0, screenIdx.current - 1);
        loadScreenAt(newIdx);
        return { idx: newIdx, size: SCREENS.length };
      },
      addPage: () => {
        SCREENS.splice(screenIdx.current + 1, 0, null);
        slidePage(screenIdx.current + 1);
        return { idx: screenIdx.current, size: SCREENS.length };
      },
      prevPage: () => {
        slidePage(screenIdx.current - 1);
        return { idx: screenIdx.current, size: SCREENS.length };
      },
      nextPage: () => {
        slidePage(screenIdx.current + 1);
        return { idx: screenIdx.current, size: SCREENS.length };
      },
      withinRect: (x, y) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x1 = rect.left;
        const y1 = rect.top;
        const x2 = x1 + rect.width;
        const y2 = y1 + rect.height;

        return x >= x1 && y >= y1 && x < x2 && y < y2;
      },
    }),
    [backgroundIdx]
  );

  const loadScreenAt = (idx) => {
    if (SCREENS[idx]) {
      contextRef.current.putImageData(SCREENS[idx], 0, 0);
    } else {
      clearCanvas();
    }
    screenIdx.current = idx;
  };

  const slidePage = (idx) => {
    const canvas = canvasRef.current;
    SCREENS[screenIdx.current] = contextRef.current.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    loadScreenAt(idx);
  };

  const clearCanvas = () => {
    const background = BACKGROUNDS[backgroundIdx];
    contextRef.current.fillStyle = `rgb(${background[0]}, ${background[1]}, ${background[2]})`;
    contextRef.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const onstart = () => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    contextRef.current = ctx;
    clearCanvas();
  }

  const onresize = () => {
    const canvas = canvasRef.current;
    const data = contextRef.current.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    contextRef.current = ctx;
    clearCanvas();
    ctx.putImageData(data, 0, 0);
  };

  const pointerDownHandler = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    if (event.button == 0) {
      event.stopPropagation();
      activeMouseRef.current = { xPos: x, yPos: y };
      escribe(activeMouseRef, contextRef, toolIdx);
    }
  };

  const pointerMoveHandler = (event) => {
    event.stopPropagation();
    const x = event.clientX;
    const y = event.clientY;
    if (activeMouseRef.current != null) {
      activeMouseRef.current = { xPos: x, yPos: y };
      escribe(activeMouseRef, contextRef, toolIdx);
    }
  };

  const pointerUpHandler = (event) => {
    activeMouseRef.current = null;
  };

  return (
    <canvas
      id="board"
      ref={canvasRef}
      onPointerDown={pointerDownHandler}
      onPointerMove={pointerMoveHandler}
      onPointerUp={pointerUpHandler}
      onPointerCancel={pointerUpHandler}
    ></canvas>
  );
});

export default Board;
