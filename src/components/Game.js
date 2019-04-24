import React, { useState, useEffect, useRef } from "react";
import Grid from "./Grid";
import Controls from "./Controls";
import { getGrid, levels } from "../services/api";
import { checkCollision } from "../services/game";

export default function Game() {
  const [random] = levels;

  const [origGrid, setOrigGrid] = useState([]);
  const [grid, setGrid] = useState(Array(81).fill(null));
  const [errorCells, setErrorCells] = useState([]);
  const [activeCell, setActiveCell] = useState(null);
  const [showNewGame, setShowNewGame] = useState(false);
  const [selectedNewGameLevel, setSelectedNewGameLevel] = useState(random);
  const startButton = useRef(null);

  useEffect(() => {
    const localOrig = localStorage.getItem("origBoard");
    const local = localStorage.getItem("board");
    if (!localOrig) {
      newBoard();
      return;
    }
    const og = JSON.parse(localOrig);
    setOrigGrid(og);
    if (local) {
      setGrid(JSON.parse(local));
    } else setGrid(og);
  }, []);

  useEffect(() => {
    const err = checkCollision(grid);
    setErrorCells(err);
  }, [grid]);

  async function newBoard() {
    const g = await getGrid(selectedNewGameLevel);
    localStorage.setItem("origBoard", JSON.stringify(g));
    localStorage.setItem("board", JSON.stringify(g));
    setOrigGrid(g);
    setGrid(g);
  }

  function onCellClick(i) {
    setActiveCell(i);
  }

  function onKeyPress(e) {
    let key;
    if (e.key === "Backspace") {
      key = null;
    } else {
      key = parseInt(e.key);
      if (!Number.isInteger(key) || key <= 0) return;
    }
    e.preventDefault();
    setKeyOnGrid(key);
  }

  function setKeyOnGrid(key) {
    if (!activeCell) return;
    const newGrid = grid.slice();
    newGrid[activeCell] = key;
    localStorage.setItem("board", JSON.stringify(newGrid));
    setGrid(newGrid);
  }

  function onClear() {
    setGrid(origGrid);
  }

  function onKeyboardKeyClick(key) {
    if (key === "del") {
      setKeyOnGrid(null);
      return;
    }
    setKeyOnGrid(key);
  }

  function toggleNewGame() {
    setShowNewGame(!showNewGame);
  }

  function newGameTypeChange(e) {
    // console.log(e.currentTarget.value);
    setSelectedNewGameLevel(e.currentTarget.value);
  }

  function capitalise(string) {
    if (!string || !string.trim()) {
      return "";
    }
    return string.substring(0, 1).toUpperCase() + string.substring(1);
  }

  async function startNewGame() {
    if (startButton && startButton.current) {
      startButton.current.disabled = true;
    }
    await newBoard();
    if (startButton && startButton.current) {
      startButton.current.disabled = false;
    }
    toggleNewGame();
  }

  return (
    <div className="Game pure-g">
      <Grid
        grid={grid}
        origGrid={origGrid}
        errorCells={errorCells}
        activeCell={activeCell}
        onCellClick={onCellClick}
        onKeyPress={onKeyPress}
      />
      <Controls onClear={onClear} onKeyboardKeyClick={onKeyboardKeyClick} />
      <div className="pure-u-1 pure-g" style={{ marginTop: "10px" }}>
        {!showNewGame ? (
          <button
            className="pure-button pure-u-1-3 button-success"
            onClick={toggleNewGame}
          >
            New Game
          </button>
        ) : (
          ""
        )}
        {showNewGame ? (
          <div className="pure-g">
            <ul className="new-game pure-u-1">
              {levels.map(newGameType => {
                return (
                  <li>
                    <label htmlFor={newGameType + "-new-game"}>
                      <input
                        id={newGameType + "-new-game"}
                        type="radio"
                        name="new-game"
                        value={newGameType}
                        onChange={newGameTypeChange}
                        checked={newGameType === selectedNewGameLevel}
                      />{" "}
                      {capitalise(newGameType)}
                    </label>
                  </li>
                );
              })}
            </ul>
            <div
              className="pure-u-1-2 pure-u-sm-1-5"
              style={{ padding: "10px" }}
            >
              <button
                className="pure-button"
                style={{ width: "100%" }}
                onClick={startNewGame}
                ref={startButton}
              >
                Start
              </button>
            </div>
            <div
              className="pure-u-1-2 pure-u-sm-1-5"
              style={{ padding: "10px" }}
            >
              <button
                className="pure-button"
                style={{ width: "100%" }}
                onClick={toggleNewGame}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
