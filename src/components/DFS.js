/*
This component visualizes the DFS algorithm
*/


import { useContext } from "react";
import { DFS, getNodesInShortestPath } from "./algorithms/DFS";
import { AlgorithmContext } from './Graph';


import React from 'react';

export default function DFSVisualize() {
    const contextValue = useContext(AlgorithmContext)
    return (
        <div>
            <button onClick={() => visualizeBFS(contextValue.grid, contextValue.startNode, contextValue.endNode)} className="visualizeBtn">
                Visualize DFS
            </button>
        </div>
    )
    
    function visualizeBFS(grid,startNode, endNode){
        contextValue.resetGrid();
        const visitedNodes= DFS(grid,startNode, endNode) 
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
}
