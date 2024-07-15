import { useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Board from './board/Board';

function App() {
  const boardRef = useRef(null);
  const activeMouseRef = useRef(null);

  const mouseTouchBoard = () => {
    if (boardRef.current != null) {
      // handle on click on this point
    }
  }
  
  const mouseMoveHandler = (x, y) => {
    if (activeMouseRef.current != null && activeMouseRef.current != {x: x, y: y}) {
      activeMouseRef.current = {x: x, y: y};
      mouseTouchBoard();
    }
  };

  const mouseDownHandler = (x, y) => {
    activeMouseRef.current = {x: -1, y: -1};
    mouseMoveHandler(x, y);
  };
  
  const mouseUpHandler = () => {
    activeMouseRef.current = null;
  };
  
  const mouseLeaveHandler = () => {
    activeMouseRef.current = null;
  };

  return (
    <div id="content">
      <Board 
        mouseDownHandler={mouseDownHandler} 
        mouseMoveHandler={mouseMoveHandler} 
        mouseUpHandler={mouseUpHandler} 
        mouseLeaveHandler={mouseLeaveHandler}
        ref={boardRef}
      />
    </div>
  );
}

export default App;