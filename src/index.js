import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
