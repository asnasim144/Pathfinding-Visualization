import React from "react";

export default function Buttons({visualizeDijkstra,startNode,endNode}) {
    return (
        <div>
            <button onClick={() => visualizeDijkstra(startNode, endNode)} className="btn">
                Visualize Dijkstra's Algorithm
            </button>
        </div>
    );
}
