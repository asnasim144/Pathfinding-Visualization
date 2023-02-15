// import React, { useMemo } from "react";
import { createContext, useEffect, useMemo, useState } from "react";
import Nodes from "./Nodes";
import { getGridSize } from "./gridSize";
// import { dijkstra, getNodesInShortestPathOrder } from "./FindPath";
// import { BFS, getNodesInShortestPath } from "./bfsAlgo";
// import Find from "./SimplePathFinding";
import Nav from "./Nav";
// import AlgorithmProvider from "./AlgorithmContext"; 

export const AlgorithmContext= createContext();

export default function Graph() {
    // const { row, col, } = getGridSize()
    const gridSize = getGridSize()
    console.log("🚀 ~ file: GraphClass.js:15 ~ Graph ~ gridSize", gridSize.row)
    const [grid, setGrid] = useState([]);
    const [setWall, setSetWall] = useState(false);
    const [startNodeChanging, setStartNodeChanging] = useState(false);
    const [endNodeChanging, setEndNodeChanging] = useState(false);
    const [startNode, setStartNode] = useState({ row: gridSize.startNode.row, col: gridSize.startNode.col });
    const [endNode, setEndNode] = useState({ row: gridSize.endNode.row, col: gridSize.endNode.col });
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    const gridMemo = useMemo(() => {
        const gridRow = [];
        const createNode = (col, row) => {
            return {
                row,
                col,
                isStart: row === startNode.row && col === startNode.col,
                isFinish: row === endNode.row && col === endNode.col,
                distance: Infinity,
                isVisited: false,
                isWall: false,
                previousNode: null,
            };
        };
        for (let row = 0; row < gridSize.row; row++) {
            const currentRow = [];
            for (let col = 0; col < gridSize.col; col++) {
                currentRow.push(createNode(col, row));
            }
            gridRow.push(currentRow);
        }
        return gridRow;
    }, [endNode.col, endNode.row, gridSize.col, gridSize.row, startNode.col, startNode.row]);
    useEffect(() => {
        setGrid(gridMemo);
    }, [gridMemo]);

    const isWallCreatable = () => {
        if (setWall) setSetWall(false);
        else setSetWall(true); 
    };

    const handleMouseDown = (row, col) => {
        setMouseIsPressed(true);
        if (row === startNode.row && col === startNode.col) { 
            setTimeout(() => {
                setStartNodeChanging(true);
            }, 60);
        }
        if (row === endNode.row && col === endNode.col) { 
            setTimeout(() => {
                setEndNodeChanging(true);
            }, 60);
        }
        if (!setWall) return;
        const newGrid = getNewGridWithWallToggles(grid, row, col);
        setGrid(newGrid);
    };
    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        changeStartNode(row, col);
        changeEndNode(row, col);
        if (!setWall) return;
        const newGrid = getNewGridWithWallToggles(grid, row, col);
        setGrid(newGrid);
    };

    const handleMouseUp = () => {
        setTimeout(() => {
            setMouseIsPressed(false);
            setStartNodeChanging(false);
            setEndNodeChanging(false);
        }, 60);
    };
    const changeStartNode = (row, col) => {
        if (!startNodeChanging) return;
        const newGrid = getNewGridWithChangeStartNodeToggles(row, col);
        // const newGrid = getNewGridWithChangeStartNodeToggles(grid, row, col);
        setGrid(newGrid);
    };
    const changeEndNode = (row, col) => {
        if (!endNodeChanging) return;
        const newGrid = getNewGridWithChangeEndNodeToggles(row, col); 
        setGrid(newGrid);
    };

    const getNewGridWithWallToggles = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };
    const getNewGridWithChangeStartNodeToggles = (row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        // changeVisualizeDijkstra(row, col, endNode);
        const newNode = {
            ...node,
            isStart: true,
        };
        setStartNode((startNode) => ({
            ...startNode,
            row: row,
            col: col,
        }));
        newGrid[row][col] = newNode;
        return newGrid;
    };
    const getNewGridWithChangeEndNodeToggles = (row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        // changeVisualizeDijkstra(row,col, endNode);
        const newNode = {
            ...node,
            isFinish: true,
        };
        setEndNode((endNode) => ({
            ...endNode,
            row: row,
            col: col,
        }));
        newGrid[row][col] = newNode;
        return newGrid;
    };
    const resetGrid = () => { 
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 50; col++) {
                const node = grid[row][col];
                node.distance= Infinity
                node.isVisited= false 
                node.previousNode= null
                document
                    .getElementById(`node-${row}-${col}`)
                    .classList.remove("node-visited");
                document
                    .getElementById(`node-${row}-${col}`)
                    .classList.remove("node-shortest-path");
            }
        }
        // setGrid(gridMemo);
    };

    return (
        <div className="container">
            {/* <Find /> */}
            <AlgorithmContext.Provider value={{grid,startNode, endNode, resetGrid , isWallCreatable, }}>
                <Nav 
                    startNode={startNode}
                    endNode={endNode}
                    isWallCreatable={isWallCreatable}
                    resetGrid={resetGrid}
                ></Nav>
            </AlgorithmContext.Provider> 
            
            <div>
                <table className="grid">
                    {grid.map((row, rowIndex) => {
                        return (
                            <tbody key={rowIndex}>
                                <tr>
                                    {row.map((node, nodeIndex) => {
                                        const {
                                            isStart,
                                            isFinish,
                                            row,
                                            col,
                                            isWall,
                                        } = node; 
                                        return (
                                            <Nodes
                                                key={nodeIndex}
                                                isStart={isStart}
                                                isFinish={isFinish}
                                                isWall={isWall}
                                                mouseIsPressed={mouseIsPressed}
                                                // startNodeChanging={startNodeChanging}
                                                endNodeChanging={endNodeChanging}
                                                onMouseDown={(row, col) =>
                                                    handleMouseDown(row, col)
                                                }
                                                onMouseEnter={(row, col) =>
                                                    handleMouseEnter(row, col)
                                                }
                                                onMouseUp={() => handleMouseUp()}
                                                col={col}
                                                row={row}
                                            ></Nodes>
                                        );
                                    })}
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
        </div>
    ); 
} 