import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import "./Board.css";

const Board = forwardRef(
  (
    { mouseDownHandler, mouseMoveHandler, mouseUpHandler, mouseLeaveHandler },
    ref
  ) => {
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

    const handleMouseDown = (event) => {
      if (event.button == 0) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mouseDownHandler(x, y);
      }
    };

    const handleMouseMove = (event) => {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseMoveHandler(x, y);
    };

    const handleMouseUp = () => {
      mouseUpHandler();
    };

    const handleMouseLeave = () => {
      mouseLeaveHandler();
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgb(50, 50, 50)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    return (
      <div
        id="boardcontainer"
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
        onPointerLeave={handleMouseLeave}
      >
        <canvas id="board" ref={canvasRef} />
      </div>
    );
  }
);

export default Board;
