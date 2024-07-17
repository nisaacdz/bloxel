import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import "./Board.css";

const Board = forwardRef(({}, ref) => {
  const canvasRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      setPixelColor: (x, y, color) => {
        const ctx = canvasRef.current.getContext("2d");
        const imageData = ctx.getImageData(x, y, 1, 1);
        const pixel = imageData.data;
        pixel[0] = color[0];
        pixel[1] = color[1];
        pixel[2] = color[2];
        ctx.putImageData(imageData, x, y);
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
      get_bounded_position: ({xPos: x, yPos: y}) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return [x - rect.left, y - rect.top];
      },
      getPixelColor: (x, y) => {
        const ctx = canvasRef.current.getContext("2d");
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        return [pixelData[0], pixelData[1], pixelData[2]];
      },
      moveScreen: (xtrans, ytrans) => {
        // Implementation for moving the screen
      },
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(50, 50, 50)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <div id="boardcontainer">
      <canvas id="board" ref={canvasRef} />
    </div>
  );
});

export default Board;
