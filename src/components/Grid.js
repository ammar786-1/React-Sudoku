import React from "react";
import Cell from "./Cell";

export default function Grid({
  grid,
  origGrid,
  errorCells,
  onCellClick,
  onKeyPress,
  activeCell
}) {
  return (
    <div className="Grid pure-u-1 pure-u-md-2-3" onKeyDown={onKeyPress}>
      {Array(9)
        .fill(null)
        .map((_, i) => {
          return (
            <div key={"row" + i} className="row">
              {Array(9)
                .fill(null)
                .map((_, j) => {
                  const idx = 9 * i + j;
                  const key = "cell-" + idx;
                  return (
                    <Cell
                      key={key}
                      value={grid[idx]}
                      isActive={idx === activeCell}
                      isEditable={origGrid[idx] === 0}
                      isError={errorCells.includes(idx)}
                      onClick={onCellClick.bind(null, idx)}
                    />
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
