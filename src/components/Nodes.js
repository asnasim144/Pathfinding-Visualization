import React from "react";

export default function Nodes({
    col,
    isFinish,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row,
}) {
    const extraClassName = isFinish
        ? "node-finish"
        : isStart
        ? "node-start"
        : isWall
        ? "node-wall"
        : "";
    // const col= color? 'color':'';
    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        ></div>
    );
}