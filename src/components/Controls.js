import React from "react";
import Keyboard from "./Keyboard";

export default function Controls({ onClear, onKeyboardKeyClick }) {
  return (
    <div className="Controls pure-u-1 pure-u-sm-1-3 pure-g">
      <button
        type="button"
        className="pure-button pure-u-1-3 pure-u-sm-1"
        onClick={onClear}
      >
        Clear All
      </button>
      <div className="pure-u-1" />
      <Keyboard onClick={onKeyboardKeyClick} />
    </div>
  );
}
