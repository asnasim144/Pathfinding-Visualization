import React from "react";
import Start from "./start.svg";
import End from "./end.svg";
import Elements from "./Elements";

export default function Info() {
    return (
        <div>
            <ul>
                <Elements name="Start Node" item={Start}></Elements>
            </ul>
        </div>
    );
}
