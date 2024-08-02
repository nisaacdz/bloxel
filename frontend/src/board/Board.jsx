import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import "./Board.css";
import { SCREENS } from "../screen";

const Board = forwardRef(({}, ref) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const prevScreenIdx = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      setPixelColor: (x, y, color) => {
        const imageData = contextRef.current.getImageData(x, y, 1, 1);
        const pixel = imageData.data;
        pixel[0] = color[0];
        pixel[1] = color[1];
        pixel[2] = color[2];
        contextRef.current.putImageData(imageData, x, y);
      },
      width: () => canvasRef.current.width,
      height: () => canvasRef.current.height,
      within_bounds: (x, y) => {
        const rect = canvasRef.current.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
        return (
          x >= 0 &&
          y >= 0 &&
          x < canvasRef.current.width &&
          y < canvasRef.current.height
        );
      },
      get_bounded_position: ({ xPos: x, yPos: y }) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return [x - rect.left, y - rect.top];
      },
      getPixelColor: (x, y) => {
        return contextRef.current.getImageData(x, y, 1, 1).data;
      },
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
    }),
    []
  );

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

  return (
    <div id="boardcontainer">
      <canvas id="board" ref={canvasRef} />
    </div>
  );
});

export default Board;
