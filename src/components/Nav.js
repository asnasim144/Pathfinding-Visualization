/*
This is the top section of the website where the buttons and icons are located, along with their introductions
*/


import React, { useContext, useRef, useState } from "react";
import { AlgorithmContext } from "./Graph";
import Info from "./Info";
import SelectAlgorithm from "./SelectAlgorithm";

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
                    <SelectAlgorithm ></SelectAlgorithm> 
                    <div className="block">

                        {/* Crear path and visited node  */}
                        <button onClick={contextValues.resetGrid} className='clear'>Clear</button>

                        {/* Toggle wall changeability */}
                        <p className="btn" onClick={handleChangeWall}>Change Wall</p>  
                        <div className="button r" id="wallBtn">
                            <input type="checkbox"  ref={checkbox} onChange={contextValues.isWallCreatable} className="checkbox"/>
                            <div className="knobs"></div>
                            <div className="layer"></div>
                        </div> 
                    </div> 
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
    function handleChangeWall() {
        checkbox.current.checked = !checkbox.current.checked
        contextValues.isWallCreatable()
    }
    // Toggle visibility of info section for small screen device
    function toggleInfo(){ 
        setRotationAngle(rotationAngle+180);
        const element = expand.current.style
        const rotateSvg = rotate.current.style
        rotateSvg.transform = `rotate(${rotationAngle}deg)`;
        rotateSvg.translation= "transform 1.5s ease-out";
        // console.log("🚀 ~ file: Nav.js:43 ~ showInfo ~ element", element)
        if(element.display === 'block'){
            expand.current.style.display = 'none'
            return
        } 
        element.display = 'block'
    }
}
