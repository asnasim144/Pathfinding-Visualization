/*
This component allows the user to select an algorithm and visualize its execution.
*/


import React, { useState } from 'react';
import BFSVisualize from './BFS';
import DFSVisualize from './DFS';
import DijsktraVisualize from "./Dijsktra";

export const Algorithm = React.createContext()

export default function SelectAlgo() {
    const [algorithm, setAlgorithm] = useState('notSelected')
    const [buttonName, setButtonName] = useState('Visualize')
    return (
        <Algorithm.Provider value={algorithm}>

            {/* Select an algorithm  */}
            <div className='btn visualize'>
                <select id='algo' onChange={(e)=>handleOption(e)}>
                    <option name='none' value='none'>
                        Select An Algorithm
                    </option>
                    <option name='dijkstra' value='dijkstra'>
                        Dijkstra
                    </option>
                    <option name='bfs' value='bfs'>
                        BFS
                    </option>
                    <option name='dfs' value='dfs'>
                        DFS
                    </option>
                </select> 

                {/* Visualize button  */}
                <div className='algo-btn'>
                    {
                        algorithm === 'dijkstra' ?
                            <DijsktraVisualize ></DijsktraVisualize>
                        :
                        algorithm === 'bfs' ?
                            <BFSVisualize ></BFSVisualize> 
                        :
                        algorithm === 'dfs' ?
                            <DFSVisualize ></DFSVisualize> 
                        :
                        <button className='visualizeBtn' onClick={handleButtonName}>{buttonName}</button>
                    }
                </div>
            </div>
        </Algorithm.Provider>
    )
    function handleOption(e){
        const value =e.target.value
        setAlgorithm(value)  
    }
    function handleButtonName(){
        if(algorithm === 'notSelected'){
            setButtonName('Pick an Algorithm') 
        }
    }
}
