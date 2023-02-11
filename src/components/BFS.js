import { BFS, getNodesInShortestPath } from "./algorithms/bfsAlgo";
import { AlgorithmContext } from './GraphClass'
import { useContext } from "react";


import React from 'react';

export default function BFSVisualize() {
    const contextValue = useContext(AlgorithmContext)

    function visualizeBFS(grid,startNode, endNode){
        contextValue.resetGrid();
        const visitedNodes= BFS(grid,startNode, endNode) 
        let i=0
        visitedNodes.map((item) => { 
            if(!grid[item.row][item.col].isWall) {
                setTimeout(() => {
                    document.getElementById(`node-${item.row}-${item.col}`).className = "node node-visited";
                    
                }, i*10);  
            } 
            i++
        })
        const nodesInShortestpath = getNodesInShortestPath(grid[endNode.row][endNode.col], grid[startNode.row][startNode.col])
        nodesInShortestpath.map((item) => { 
            setTimeout(() => {
                document.getElementById(`node-${item.row}-${item.col}`).className = "node node-shortest-path";
                
            }, i*10);
            i++
        }); 
    }
    return (
        <div>
            <button onClick={() => visualizeBFS(contextValue.grid, contextValue.startNode, contextValue.endNode)} className="visualizeBtn">
                Visualize BFS
            </button>
        </div>
    )
}
