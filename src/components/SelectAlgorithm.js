import React, { useState, useRef } from 'react';
import Dijsktra from "./algorithms/Dijsktra";
// import { AlgorithmContext } from './GraphClass';
// import { dijkstra } from './FindPath';
import BFSVisualize from './BFS';
import DFSVisualize from './DFS';

export const Algorithm = React.createContext()

export default function SelectAlgo() {
    const [algorithm, setAlgorithm] = useState('notSelected')
    const [buttonName, setButtonName] = useState('Visualize')
    // const selectAlgorithm= useRef()
    // const contextValues = useContext(AlgorithmContext)
    // console.log(contextValues,'contextval')
    return (
        <Algorithm.Provider value={algorithm}>
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
                        <button className='visualizeBtn' onClick={handleButtonName}>{buttonName}</button>
                    }
                </div>
            </div>
        </Algorithm.Provider>
        // <Algorithm.Provider value={algorithm}>
        //     <div className='btn visualize'>
        //         <div onClick={handleOptions}>
        //             <div name='none' value='none'>
        //                 Select An Algorithm
        //             </div>
        //         </div>
        //         <div id='algo' ref={selectAlgorithm} className='btn visualize' onChange={(e)=>handleOption(e)}>
        //             <div name='dijkstra' value='dijkstra'>
        //                 Dijkstra
        //             </div>
        //             <div name='bfs' value='bfs'>
        //                 BFS
        //             </div>
        //             <div name='dfs' value='dfs'>
        //                 DFS
        //             </div>
        //         </div> 
        //     </div>
        //         <div className='algo-btn'>
        //             {
        //                 algorithm === 'dijkstra' ?
        //                     <Dijsktra ></Dijsktra>
        //                 :
        //                 algorithm === 'bfs' ?
        //                     <BFSVisualize ></BFSVisualize> 
        //                 :
        //                 algorithm === 'dfs' ?
        //                     <DFSVisualize ></DFSVisualize> 
        //                 :
        //                 <button className='visualizeBtn' onClick={handleButtonName}>{buttonName}</button>
        //             }
        //         </div>
        // </Algorithm.Provider>
    )
    function handleOption(e){
        const value =e.target.value
        setAlgorithm(value)  
    }
    // function handleOptions(){
        
    // }
    function handleButtonName(){
        if(algorithm === 'notSelected'){
            setButtonName('Pick an Algorithm') 
        }
    }
}
