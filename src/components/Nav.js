import React from "react";
import Buttons from "./Buttons";
import Info from "./Info";

export default function Nav({
    visualizeDijkstra,
    startNode,
    endNode,
    isWallCreatable,
    resetGrid,
}) {
    return (
        <div>
            <div className="nav">
                {/* <button onClick={() => visualizeDijkstra(startNode, endNode)}>
                    Visualize Dijkstra's Algorithm
                </button> */}
                <h2>Pathfinding Visualizer</h2>
                <div className="buttons">
                    <Buttons
                        visualizeDijkstra={(startNode, endNode) =>
                            visualizeDijkstra(startNode, endNode)
                        }
                        startNode={startNode}
                        endNode={endNode}
                    >
                        Visualize Dijkstra's Algorithm
                    </Buttons>
                    <button onClick={isWallCreatable}>Wall</button>
                    <button onClick={resetGrid}>Reset</button>
                </div>
            </div>
            <div className="info">
                <Info></Info>
            </div>
        </div>
    );
}
