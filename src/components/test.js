import React, { useRef, useState } from "react";

function Grid() {
    const gridRefs = Array.from({ length: 25 }, (_, i) => useRef(null));
    const [activeId, setActiveId] = useState(null);

    const handleClick = (id) => {
        setActiveId(id);
    };

    return (
        <div>
            <div className="grid">
                {gridRefs.map((ref, i) => (
                    <div
                        key={i}
                        ref={ref}
                        className={`grid-cell ${
                            i === activeId ? "active" : ""
                        }`}
                        onClick={() => handleClick(i)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Grid;
