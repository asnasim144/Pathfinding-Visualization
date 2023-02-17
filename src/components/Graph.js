/* 
This component is responsible for creating the graph and setting properties of its cells. The algorithms will be displayed on this graph. Additional functionality, such as creating walls and changing the start and end nodes, is also included.
*/ 
import { createContext, useEffect, useMemo, useState } from "react";
import Nodes from "./Nodes";
import { getGridSize } from "./gridSize";
import Nav from "./Nav";

export const AlgorithmContext= createContext();

export default function Graph() {
    // This is used to obtain the grid size and the positions of the start and end nodes from the gridSize page 
    const gridSize = getGridSize()
    const gridRowCount = gridSize.row
    const gridColCount = gridSize.col

    const [grid, setGrid] = useState([]);
    const [setWall, setSetWall] = useState(false);
    const [startNodeChanging, setStartNodeChanging] = useState(false);
    const [endNodeChanging, setEndNodeChanging] = useState(false);
    // Start node position
    const [startNode, setStartNode] = useState({ row: gridSize.startNode.row, col: gridSize.startNode.col });

    // End node position
    const [endNode, setEndNode] = useState({ row: gridSize.endNode.row, col: gridSize.endNode.col });
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    // This grid is the main graph. And its property which will help to visualize algorithm
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
        for (let row = 0; row < gridRowCount; row++) {
            const currentRow = [];
            for (let col = 0; col < gridColCount; col++) {
                currentRow.push(createNode(col, row));
            }
            gridRow.push(currentRow);
        }
        return gridRow;
    }, [endNode.col, endNode.row, gridColCount, gridRowCount, startNode.col, startNode.row]);
    useEffect(() => {
        setGrid(gridMemo);
    }, [gridMemo]);

    // Enable and disable the ability to create walls.
    const isWallCreatable = () => {
        if (setWall) setSetWall(false);
        else setSetWall(true); 
    };

    // Handle mouse click and press events for creating walls and changing the start and end nodes
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

    // Change start node position
    const changeStartNode = (row, col) => {
        if (!startNodeChanging) return;
        const newGrid = getNewGridWithChangeStartNodeToggles(row, col); 
        setGrid(newGrid);
    };

    // Change end node position
    const changeEndNode = (row, col) => {
        if (!endNodeChanging) return;
        const newGrid = getNewGridWithChangeEndNodeToggles(row, col); 
        setGrid(newGrid);
    };

    // Toggle wall
    const getNewGridWithWallToggles = (grid, row, col) => {
        if(grid[row][col].isStart || grid[row][col].isFinish) return grid
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    // Change start node
    const getNewGridWithChangeStartNodeToggles = (row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col]; 
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

    // Change start node
    const getNewGridWithChangeEndNodeToggles = (row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col]; 
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

    // Clear visited path
    const clearPath = () => { 
        for (let row = 0; row < gridRowCount; row++) {
            for (let col = 0; col < gridColCount; col++) {
                const node = grid[row][col];
                node.isVisited= false 
                node.distance= Infinity
                node.previousNode= null
                document
                    .getElementById(`node-${row}-${col}`)
                    .classList.remove("node-visited");
                document
                    .getElementById(`node-${row}-${col}`)
                    .classList.remove("node-shortest-path");
            }
        }
    }; 

    return (
        <div className="container">
            {/* Providing velues to its child */}
            <AlgorithmContext.Provider value={{grid,startNode, endNode, clearPath , isWallCreatable, }}>
                <Nav 
                    startNode={startNode}
                    endNode={endNode}
                    isWallCreatable={isWallCreatable}
                    clearPath={clearPath}
                ></Nav>
            </AlgorithmContext.Provider> 
            
            <div>
                {/* Createing the main graph */}
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