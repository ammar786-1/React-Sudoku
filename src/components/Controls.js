import React from "react";

export default function Controls({ onClear }) {
  return (
    <div className="Controls pure-u-1 pure-u-md-1-3 pure-g">
      <button
        type="button"
        className="pure-button pure-u-1-3"
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  );
}
