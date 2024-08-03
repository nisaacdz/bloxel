import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import "./Board.css";
import { SCREENS } from "../screen";

const Board = forwardRef(({ activeTool }, ref) => {
  const activeMouseRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const prevScreenIdx = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.fillStyle = "rgb(50, 50, 50)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    SCREENS.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

    contextRef.current = ctx;

    window.addEventListener("resize", onresize);
    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      changePage: (screenIdx) => {
        changeScreen(screenIdx);
      },
      setPage: (screenIdx) => {
        setScreen(screenIdx);
      },
      clearAll: () => {
        contextRef.current.fillStyle = "rgb(50, 50, 50)";
        contextRef.current.fillRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
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
    []
  );

  const setPixelColor = (x, y, color) => {
    const imageData = contextRef.current.getImageData(x, y, 1, 1);
    const pixel = imageData.data;
    pixel[0] = color[0];
    pixel[1] = color[1];
    pixel[2] = color[2];
    contextRef.current.putImageData(imageData, x, y);
  };

  // const width = () => canvasRef.current.width;
  // const height = () => canvasRef.current.height,

  const getPixelColor = (x, y) => {
    return contextRef.current.getImageData(x, y, 1, 1).data;
  };

  const setScreen = (screenIdx) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (screenIdx === SCREENS.length) {
      SCREENS.push(null);
    }
    if (!SCREENS[screenIdx]) {
      // Create a new default screen
      ctx.fillStyle = "rgb(50, 50, 50)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      SCREENS[screenIdx] = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } else {
      // Load the existing screen
      ctx.putImageData(SCREENS[screenIdx], 0, 0);
    }

    contextRef.current = ctx;
    prevScreenIdx.current = screenIdx;
  };

  const changeScreen = (screenIdx) => {
    const canvas = canvasRef.current;
    if (prevScreenIdx.current !== null) {
      SCREENS[prevScreenIdx.current] = contextRef.current.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
    setScreen(screenIdx);
  };

  const onresize = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.fillStyle = "rgb(50, 50, 50)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(data, 0, 0);
    contextRef.current = ctx;
  };

  const escribe = () => {
    if (activeMouseRef.current != null) {
      const { xPos: mouseX, yPos: mouseY } = activeMouseRef.current;

      const boardWidth = canvasRef.current.width;
      const boardHeight = canvasRef.current.height;
      const tool = activeTool;

      const midi = Math.floor(tool.sizeX() / 2);
      const midj = Math.floor(tool.sizeY() / 2);

      for (let tj = 0; tj < tool.sizeY(); tj++) {
        for (let ti = 0; ti < tool.sizeX(); ti++) {
          const [r1, g1, b1, a] = tool.idx(tj, ti);

          const ni = mouseX + ti - midi;
          const nj = mouseY + tj - midj;

          if (ni >= 0 && ni < boardWidth && nj >= 0 && nj < boardHeight) {
            const [r2, g2, b2] = getPixelColor(ni, nj);

            const f1 = a / 255;
            const f2 = 1.0 - f1;

            const r = f1 * r1 + f2 * r2;
            const g = f1 * g1 + f2 * g2;
            const b = f1 * b1 + f2 * b2;

            setPixelColor(ni, nj, [
              Math.floor(r),
              Math.floor(g),
              Math.floor(b),
            ]);
          }
        }
      }
    }
  };

  const pointerDownHandler = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    if (event.button == 0) {
      event.stopPropagation();
      activeMouseRef.current = { xPos: x, yPos: y };
      escribe();
    }
  };

  const pointerMoveHandler = (event) => {
    event.stopPropagation();
    const x = event.clientX;
    const y = event.clientY;
    if (activeMouseRef.current != null) {
      activeMouseRef.current = { xPos: x, yPos: y };
      escribe();
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
