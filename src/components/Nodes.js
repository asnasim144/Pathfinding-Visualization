/*
This is the smallest component of the graph. Here, nodes are created and designed according to their properties
*/


import React from "react";
import Start from "../asset/start.svg";
import End from "../asset/end.svg";

const Finished = ({ sss }) => {
    if (sss === true) {
        // alert(JSON.stringify(sss))
        return (
            // <HandleIcon  />
            <img src={End} alt=" SVG" />
        );
    }
};
const Started = ({ sss }) => {
    if (sss === true) {
        // alert(JSON.stringify(sss))
        return (
            // <HandleIcon  />
            <img src={Start} alt=" SVG" />
        );
    }
};
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
    // Select class name according to its property
    const extraClassName = isFinish
        ? "node-finish"
        : isStart
        ? "node-start"
        : isWall
        ? "node-wall"
        : "";
        

    return (
        <td
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        > 
            <Finished sss={isFinish} />
            <Started sss={isStart} />
        </td>
    );
}
