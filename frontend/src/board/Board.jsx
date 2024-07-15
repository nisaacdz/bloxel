import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import './Board.css';

const Board = forwardRef(({ mouseDownHandler, mouseMoveHandler, mouseUpHandler, mouseLeaveHandler }, ref) => {
  const canvasRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setPixelColor: (x, y, color) => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = color;
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
  }), [canvasRef]);

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

  return (
    <canvas
      id="board"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    />
  );
});

export default Board;
