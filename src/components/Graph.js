import React from "react";
import Nodes from "./Nodes";
import { useState, useEffect } from "react";

export default function Graph() {
    const [nodes, setNodes] = useState([]);
    // const reference = useRef([]);
    for (let row = 0; row < 25; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push([]);
            const currentNode = {
                col,
                row,
                isStart: row === 10 && col === 5,
                isFinished: row === 10 && col === 54,
            };
        }
        nodes.push(currentRow);
    }
    useEffect(() => {
        setNodes(nodes);
        console.log("row");
    }, [nodes]);
    // function sample(nextElement) {
    //     const next_arr = [...nodes, nextElement]
    //     setNodes(next_arr)
    // };
    // sample(currentRow)
    console.log(nodes);
    return (
        <div className="container">
            <div className="grid">
                <h1>Graph</h1>
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {isStart, isFinished} = node;
                                // console.log(isStart, isFinished);
                                console.log(row)
                                return (
                                    <Nodes
                                        key={nodeIdx}
                                        isStart={isStart}
                                        isFinished={isFinished}
                                        test="foo"
                                    ></Nodes>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
