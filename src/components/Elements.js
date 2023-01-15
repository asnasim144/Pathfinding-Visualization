// import React from "react";

export default function Elements({ name, item }) {
    return (
        <div>
            <li>
                <img src={item} alt=" SVG" /> {name}
            </li>
        </div>
    );
}
