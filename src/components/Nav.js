import React, {useRef, useContext} from "react";
// import Buttons from "./Buttons";
import SelectAlgo from "./SelectAlgorithm";
import Info from "./Info";
// import Dijsktra from "./Dijsktra";
import { AlgorithmContext } from "./GraphClass";

export default function Nav() { 
    const checkbox = useRef()
    const contextValues = useContext(AlgorithmContext)

    return (
        <div>
            <div className="nav"> 
                <h2>Pathfinding Visualizer</h2>
                <div className="buttons">
                    <SelectAlgo ></SelectAlgo> 
                    <div className="block">
                        <button onClick={contextValues.resetGrid} className='clear'>Clear</button>
                        <p className="btn" onClick={handleCheckbox}>Change Wall</p>  
                        <div className="button r" id="wallBtn">
                            <input type="checkbox"  ref={checkbox} onChange={contextValues.isWallCreatable} className="checkbox" />
                            <div className="knobs"></div>
                            <div className="layer"></div>
                        </div> 
                    </div>
                    {/* <button onClick={isWallCreatable} className='addWallBtn'></button> */}
                </div>
            </div>
            <div className="info">
                <Info></Info>
            </div>
        </div>
    ); 
    function handleCheckbox() {
        checkbox.current.checked = !checkbox.current.checked
        contextValues.isWallCreatable()
    }
}
