/*
This component is used to introduce icons and elements to users.
*/


import React from "react";
import Start from "../asset/start.svg";
import End from "../asset/end.svg";

export default function Info() {
    return (
        <div>
            <ul>
                <Elements name="Start Node" item={Start}></Elements>
                <Elements name="End Node" item={End}></Elements>
                <Elements name="Visited Node"  ></Elements>
                <Elements name="Unvisited Node" ></Elements>
                <Elements name="Wall" ></Elements>
            </ul>
        </div>
    );
    function Elements({ name, item }) {
        return (
            <li>
                <div>
                    {/* <img src={item} alt="" />  */}
                    <ItemIconHandling />
                </div>
                <div>
                    {name}
                </div>
            </li>
        );
        function ItemIconHandling() {
            if(name=== "Visited Node"){
                return (
                    <div className="visited">
                    </div>
                )
            }
            if(name=== "Unvisited Node"){
                return (
                    <div className="unvisited">
                    </div>
                )
            }
            if(name=== "Wall"){
                return (
                    <div className="wall">
                    </div>
                )
            }
            else{
                return (
                    <img src={item} alt="" />  
                )
            }
            
        }
    }
}
