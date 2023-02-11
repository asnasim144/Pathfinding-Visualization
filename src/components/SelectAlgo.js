import React, { useContext, useState } from 'react';
import Dijsktra from "./algorithms/Dijsktra";
import { AlgorithmContext } from './GraphClass';
// import { dijkstra } from './FindPath';
import BFSVisualize from './BFS';
import DFSVisualize from './DFS';

export const Algorithm = React.createContext()

export default function SelectAlgo() {
    const [algorithm, setAlgorithm] = useState('notSelected')
    const contextValues = useContext(AlgorithmContext)
    // console.log(contextValues,'contextval')
    return (
        <Algorithm.Provider value={algorithm}>
            <div className='btn visualize'>
                <select id='algo' onChange={(e)=>handleOption(e)}>
                    <option name='none'>
                        Select An Algorithm
                    </option>
                    <option name='dijkstra' value='dijkstra'>
                        Dijkstra
                    </option>
                    <option name='bfs' value='bfs'>
                        BFS
                    </option> 
                </select> 
                <div className='algo-btn'>
                    {
                        algorithm === 'dijkstra' ?
                            <Dijsktra ></Dijsktra>
                        :
                        algorithm === 'bfs' ?
                            <BFSVisualize ></BFSVisualize> 
                        :
                        algorithm === 'dfs' ?
                            <DFSVisualize ></DFSVisualize> 
                        :
                        <button className='visualizeBtn'>Visualize</button>
                    }
                </div>
            </div>
        </Algorithm.Provider>
    )
    function handleOption(e){
        const value =e.target.value
        setAlgorithm(value)  
    }
}