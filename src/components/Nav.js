import React, { useState, useRef, useContext} from "react";
// import Buttons from "./Buttons";
import SelectAlgo from "./SelectAlgorithm";
import Info from "./Info";
// import Dijsktra from "./Dijsktra";
import { AlgorithmContext } from "./GraphClass";

export default function Nav() { 
    const [rotationAngle, setRotationAngle] = useState(0);
    const checkbox = useRef()
    const expand = useRef()
    const rotate = useRef()
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
                            <input type="checkbox"  ref={checkbox} onChange={contextValues.isWallCreatable} className="checkbox"/>
                            <div className="knobs"></div>
                            <div className="layer"></div>
                        </div> 
                    </div>
                    {/* <button onClick={isWallCreatable} className='addWallBtn'></button> */}
                </div>
            </div>
            <div className="hidden" onClick={toggleInfo}>
                <svg ref={rotate} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M169.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L192 205.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
            </div>
            <div className="info" ref={expand}>
                <Info></Info>
            </div>
        </div>
    ); 
    function handleCheckbox() {
        checkbox.current.checked = !checkbox.current.checked
        contextValues.isWallCreatable()
    }
    function toggleInfo(){ 
        setRotationAngle(rotationAngle+180);
        const element = expand.current.style
        const rotateSvg = rotate.current.style
        rotateSvg.transform = `rotate(${rotationAngle}deg)`;
        rotateSvg.translation= "transform 1.5s ease-out";
        console.log("🚀 ~ file: Nav.js:43 ~ showInfo ~ element", element)
        if(element.display === 'block'){
            expand.current.style.display = 'none'
            return
        } 
        element.display = 'block'
    }
}
