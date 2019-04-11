import React from "react";

export default function Keyboard({ onClick }) {
  function renderKey(i) {
    return <td onClick={_ => onClick(i)}>{i}</td>;
  }

  return (
    <div className="Keyboard pure-u-1">
      <table className="pure-table pure-table-bordered">
        <tbody>
          <tr>
            {renderKey(1)}
            {renderKey(2)}
            {renderKey(3)}
          </tr>
          <tr>
            {renderKey(4)}
            {renderKey(5)}
            {renderKey(6)}
          </tr>
          <tr>
            {renderKey(7)}
            {renderKey(8)}
            {renderKey(9)}
          </tr>
          <tr>
            <td />
            <td />
            <td onClick={_ => onClick("del")}>
              <i class="fas fa-backspace" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
