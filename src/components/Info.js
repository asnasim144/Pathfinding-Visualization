import React from "react";
import Start from "./start.svg";
import End from "./end.svg";
import Elements from "./Elements";

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

}
