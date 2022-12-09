import React from 'react'

export default function Nodes({isStart, isFinished}) {
    const boundClass= isFinished? 'endNode' : isStart? 'startNode': '';
    return (
        <div className={`node ${boundClass}`}>
            <p></p>
        </div>
    )
}
export const DEFAULT_NODE= {
    col:0,
    row:0,
}