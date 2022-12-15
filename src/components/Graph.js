// import React, { useMemo } from "react";
import Nodes from "./Nodes";
import { useState, useEffect,  useMemo } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "./FindPath";


export default function Graph() {
    const [grid, setGrid] = useState([]);
    const [setWall, setSetWall] = useState(false);
    const [startNodeChanging, setStartNodeChanging] = useState(false);
    const [startNode, setStartNode] = useState({ row: 7, col:5});
    const [endNode, setEndNode] = useState({ row: 7, col:44 });
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    
    const gridd = useMemo(() => {
        const gri = [];
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
        for (let row = 0; row < 15; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                currentRow.push(createNode(col, row));
            }
            gri.push(currentRow);
        }
        return gri;
    }, [endNode.col, endNode.row, startNode.col, startNode.row]);
    useEffect(() => { 
        setGrid(gridd);
    }, [gridd]);
    console.log("grid", grid);

    const isWallCreatable = () => {
        // alert("slfj");
        if(setWall) setSetWall(false);
        setSetWall(true);
    };
    
    const handleMouseDown = (row, col) => {
        // if(!setWall) return;
        const newGrid = getNewGridWithWallToggles(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
        if(row === startNode.row && col === startNode.col) {
            alert("start Node")
            setTimeout(() => {
                setStartNodeChanging(true)
            }, 60);
        }

    };
    const handleMouseEnter = (row, col) => {
        // if(!setWall) return;
        changeStartNode(row,col);
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggles(grid, row, col);
        setGrid(newGrid);
};

    const handleMouseUp = () => {
        setTimeout(() => {
            setMouseIsPressed(false);
            setStartNodeChanging(false)
        }, 60);
    };
    const changeStartNode = (row,col) => {
        if(!startNodeChanging)return;
        const newGrid = getNewGridWithWallToggles(grid, row, col);
        setGrid(newGrid);
    }

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
    const abc = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isStart: true,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

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

    const visualizeDijkstra = (start, end) => {
        const startNode = grid[start.row][start.col];
        const finishNode = grid[end.row][end.col];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder =
            getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    };

    return (
        <div className="container">
            <button onClick={() => visualizeDijkstra(startNode,endNode)}>
                Visualize Dijkstra's Algorithm
            </button> 
            <button onClick={isWallCreatable}>Wall</button>
            <div className="grid">
                <h1>Graph</h1>
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {
                                    isStart,
                                    isFinish,
                                    row,
                                    col,
                                    isWall,
                                } = node;
                                console.log("s",isStart,"f", isFinish, startNodeChanging ,mouseIsPressed);
                                // console.log(node);
                                return (
                                    <Nodes
                                        key={nodeIdx}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        isWall={isWall}
                                        mouseIsPressed={mouseIsPressed}
                                        startNodeChanging={startNodeChanging}
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
}