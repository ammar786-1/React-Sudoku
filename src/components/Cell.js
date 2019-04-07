import React from "react";
import { PropTypes } from "prop-types";

export default function Cell({
  value,
  isActive,
  isEditable,
  isError,
  onClick
}) {
  const classNames = Object.entries({
    "cell-container": true,
    active: isActive,
    editable: isEditable,
    error: isError
  })
    .filter(([_, value]) => !!value)
    .map(([key, _]) => key)
    .join(" ");

  function onCellClick(e) {
    if (isEditable) {
      return onClick(e);
    }
  }

  return (
    <div className={classNames} onClick={onCellClick} tabIndex="0">
      <div className="cell-wrapper">
        <div className="cell">{value < 1 || value > 9 ? "" : value}</div>
      </div>
    </div>
  );
}

Cell.propTypes = {
  value: PropTypes.number
};
