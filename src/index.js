import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Grid from "./components/Grid";

import "./styles.css";
import Controls from "./components/Controls";
import { func } from "prop-types";
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
