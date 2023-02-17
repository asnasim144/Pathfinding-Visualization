/*
This component visualizes the Dijkstra algorithm
*/


import React, { useContext } from 'react';
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dikjstra";
import { AlgorithmContext } from './Graph';


export default function Dijsktra() {
    const contextValue= useContext(AlgorithmContext) 

    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-visited";
            }, 10 * i);
        }
    };

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-shortest-path";
            }, 50 * i);
        }
    };

    // Unfinished feature where
    const changeDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                // setTimeout(() => {
                changeShortestPath(nodesInShortestPathOrder);
                // }, 10 * i);
                return;
            }
            // setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                "node node-visited";
            // }, 10 * i);
        }
    };
    const changeShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            // setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                "node node-shortest-path";
            // }, 50 * i);
        }
    };
    const changeVisualizeDijkstra = (row, col, end) => {
        contextValue.clearPath();
        const startNode = contextValue.grid[row][col];
        const finishNode = contextValue.grid[end.row][end.col];
        const visitedNodesInOrder = dijkstra(contextValue.grid, startNode, finishNode);
        const nodesInShortestPathOrder =
            getNodesInShortestPathOrder(finishNode);
        changeDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    };

    // Self explanatory
    const visualizeDijkstra = (start, end) => {
        contextValue.clearPath();
        const startNode = contextValue.grid[start.row][start.col];
        const finishNode = contextValue.grid[end.row][end.col];
        const visitedNodesInOrder = dijkstra(contextValue.grid, startNode, finishNode);
        const nodesInShortestPathOrder =
            getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    };
    
    return (
        <div>
            <div>
                <button onClick={() => visualizeDijkstra(contextValue.startNode, contextValue.endNode)} className="visualizeBtn">
                    Visualize Dijkstra
                </button>
            </div>
        </div>
    )
}
