import React, { useState, useEffect } from "react";
import Grid from "./Grid";
import Controls from "./Controls";

export default function Game() {
  const [origGrid, setOrigGrid] = useState([]);
  const [grid, setGrid] = useState(Array(81).fill(null));
  const [errorCells, setErrorCells] = useState([]);
  const [activeCell, setActiveCell] = useState(null);

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
    checkCollision(grid);
  }, [grid]);

  async function newBoard() {
    const g = await getRandom();
    localStorage.setItem("origBoard", JSON.stringify(g));
    localStorage.setItem("board", JSON.stringify(g));
    setOrigGrid(g);
    setGrid(g);
  }

  function checkCollision(grid) {
    const err = [];

    // column coliision
    for (let col = 0; col < 9; col++) {
      for (let row = 0; row < 9; row++) {
        const idx = row * 9 + col;
        const val = grid[idx];
        if (!val) {
          continue;
        }
        for (let tRow = 0; tRow < 9; tRow++) {
          const tIdx = tRow * 9 + col;
          const tVal = grid[tIdx];

          if (tVal === val && idx !== tIdx) {
            err.push(idx);
          }
        }
      }
    }

    // row coliision
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const idx = row * 9 + col;
        const val = grid[idx];
        if (!val) {
          continue;
        }
        if (val === 0) {
          continue;
        }
        for (let tCol = 0; tCol < 9; tCol++) {
          const tIdx = row * 9 + tCol;
          const tVal = grid[tIdx];
          if (tVal === val && idx !== tIdx) {
            err.push(idx);
          }
        }
      }
    }

    //box collision
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const valCache = [];
        for (let br = 0; br < 3; br++) {
          for (let bc = 0; bc < 3; bc++) {
            const row = 3 * r + br;
            const col = 3 * c + bc;
            const idx = 9 * row + col;
            const value = grid[idx];
            if (!value) {
              continue;
            }
            const cache = valCache[value];
            if (cache && cache.length) {
              if (cache.length === 1) {
                err.push(cache[0]);
              }
              err.push(idx);
              cache.push(idx);
            } else {
              valCache[value] = [idx];
            }
          }
        }
      }
    }

    setErrorCells(err);
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
    const newGrid = grid.slice();
    newGrid[activeCell] = key;
    localStorage.setItem("board", JSON.stringify(newGrid));
    setGrid(newGrid);
  }

  function onClear() {
    setGrid(origGrid);
  }

  return (
    <div className="Game pure-g">
      <Grid
        grid={grid}
        origGrid={origGrid}
        errorCells={errorCells}
        activeCell={activeCell}
        onCellClick={onCellClick}
      />
      <Controls onClear={onClear} />
    </div>
  );
}
