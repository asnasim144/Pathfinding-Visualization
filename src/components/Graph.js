// import React, { useMemo } from "react";
import Nodes from "./Nodes";
import { useState, useEffect, useMemo } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "./FindPath";
import Find from "./SimplePathFinding";
import Nav from "./Nav";

export default function Graph() {
    const [grid, setGrid] = useState([]);
    const [setWall, setSetWall] = useState(false);
    const [startNodeChanging, setStartNodeChanging] = useState(false);
    const [endNodeChanging, setEndNodeChanging] = useState(false);
    const [startNode, setStartNode] = useState({ row: 7, col: 5 });
    const [endNode, setEndNode] = useState({ row: 7, col: 44 });
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
        for (let row = 0; row < 15; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                currentRow.push(createNode(col, row));
            }
            gridRow.push(currentRow);
        }
        return gridRow;
    }, [endNode.col, endNode.row, startNode.col, startNode.row]);
    useEffect(() => {
        setGrid(gridMemo);
    }, [gridMemo]);
    // console.log("grid", grid);

    const isWallCreatable = () => {
        if (setWall) setSetWall(false);
        else setSetWall(true);
        // alert(setWall);
    };

    const handleMouseDown = (row, col) => {
        setMouseIsPressed(true);
        if (row === startNode.row && col === startNode.col) {
            // alert("start Node");
            setTimeout(() => {
                setStartNodeChanging(true);
            }, 60);
        }
        if (row === endNode.row && col === endNode.col) {
            // alert("start Node");
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
        changeVisualizeDijkstra(row, col, endNode);
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

    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 1 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-visited";
            }, 1 * i);
        }
    };

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(
                    `node-${node.row}-${node.col}`
                ).className = "node node-shortest-path";
            }, 5 * i);
        }
    };
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
        resetGrid();
        const startNode = grid[row][col];
        const finishNode = grid[end.row][end.col];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder =
            getNodesInShortestPathOrder(finishNode);
        changeDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    };
    const visualizeDijkstra = (start, end) => {
        const startNode = grid[start.row][start.col];
        const finishNode = grid[end.row][end.col];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder =
            getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    };
    const resetGrid = () => {
        // const newGrid = gridd.slice();
        console.log("log");
        for (let row = 0; row < 15; row++) {
            for (let col = 0; col < 50; col++) {
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
            <Find />
            <Nav
                visualizeDijkstra={(startNode, endNode) =>
                    visualizeDijkstra(startNode, endNode)
                }
                startNode={startNode}
                endNode={endNode}
                isWallCreatable={isWallCreatable}
                resetGrid={resetGrid}
            ></Nav>
            <div>
                <div className="grid">
                    {grid.map((row, rowIndex) => {
                        return (
                            <div key={rowIndex}>
                                {row.map((node, nodeIndex) => {
                                    const {
                                        isStart,
                                        isFinish,
                                        row,
                                        col,
                                        isWall,
                                    } = node;
                                    // console.log(
                                    //     "s",
                                    //     isStart,
                                    //     "f",
                                    //     isFinish,
                                    //     startNodeChanging,
                                    //     mouseIsPressed
                                    // );
                                    // console.log(node);
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
