import React, { useImperativeHandle } from 'react';
import './Board.css';

function Board() {
    const canvasRef = useRef(null);

    useImperativeHandle(ref, () => ({
        changePixelColor: (x, y, color) => {
            const ctx = canvasRef.current.getContext('2d');
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        },
        moveScreen: (xtrans, ytrans) => {

        }
    }));

    const handleClick = (event) => {
        // Get the coordinates of the click
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    };

    return (
        <div id="board" onClick={handleClick} ref={canvasRef}/>
    );
};

export default Board;