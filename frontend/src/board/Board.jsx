import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import './Board.css';

const Board = forwardRef(({ mouseDownHandler, mouseMoveHandler, mouseUpHandler, mouseLeaveHandler }, ref) => {
  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setPixelColor: (x, y, color) => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      ctx.fillRect(x, y, 1, 1);
    },
    width: () => {
      return canvasRef.current.width;
    },
    height: () => {
      return canvasRef.current.height;
    },
    getPixelColor: (x, y) => {
      const ctx = canvasRef.current.getContext('2d');
      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      return [pixelData[0], pixelData[1], pixelData[2]];
    },
    moveScreen: (xtrans, ytrans) => {
      // Implementation for moving the screen
    }
  }), []);

  const handleMouseDown = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mouseDownHandler(x, y);
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
  }, []);
  

  return (
    <div id="boardcontainer">
      <canvas
      id="board"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    />
    </div>
  );
});

export default Board;
