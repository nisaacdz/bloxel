import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Board from './board/Board';

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  return (
    <div id="content">
      <Board />
    </div>
  );
}

export default App;