import React from "react";
import Start from "./start.svg";
import End from "./end.svg";

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
    // const icon = isFinish ? End : isStart ? Start : false;
    // alert(isFinish)
    const extraClassName = isFinish
        ? "node-finish"
        : isStart
        ? "node-start"
        : isWall
        ? "node-wall"
        : "";
    // const col= color? 'color':'';

    // alert(isFinish)

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
        >
            {/* <HandleIcon isStart={isStart} isFinish={isFinish} /> */}
            {/* {dummy} */}
            <Finished sss={isFinish} />
            <Started sss={isStart} />
        </div>
    );
}
