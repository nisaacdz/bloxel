import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import "./Board.css";

const Board = forwardRef(({}, ref) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

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
        const pixelData = contextRef.current.getImageData(x, y, 1, 1).data;
        return [pixelData[0], pixelData[1], pixelData[2]];
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

  const handleResize = () => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = "rgb(50, 50, 50)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    contextRef.current = ctx;
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="boardcontainer">
      <canvas id="board" ref={canvasRef} />
    </div>
  );
});

export default Board;
