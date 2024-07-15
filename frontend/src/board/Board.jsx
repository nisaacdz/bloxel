import React, { useImperativeHandle } from 'react';
import './Board.css';

function Board({ mouseDownHandler, mouseMoveHandler, mouseUpHandler, mouseLeaveHandler }) {
    const canvasRef = useRef(null);

    useImperativeHandle(ref, () => ({
        setPixelColor: (x, y, color) => {
            const ctx = canvasRef.current.getContext('2d');
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        },
        getPixelColor: (x, y) => {
            const ctx = canvasRef.current.getContext('2d');
            return ctx.getPixelColor(x, y)
        },
        moveScreen: (xtrans, ytrans) => {

        }
    }));

    const handleMouseDown = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mouseDownHandler(x, y)
    };

    const handleMouseMove = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mouseMoveHandler(x, y)
    };

    const handleMouseUp = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mouseUpHandler(x, y)
    };

    const handleMouseLeave = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mouseLeaveHandler(x, y)
    };

    return (
        <div id="board"
        onClick={handleClick}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave} />
    );
};

export default Board;