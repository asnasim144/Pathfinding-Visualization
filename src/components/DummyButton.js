import React from 'react'


export default function DummyButton() {
    const getButtonsUsingMap = () => {
        const array = [1, 2, 3 ,4, 5]
    
        return array.map((number) => {
            return <button>{number}</button>
        })
    
    }
    
    const getButtonsUsingForLoop = (num) => {
        const array = []
    
        for(var i = 1; i <= num; i++){
            array.push(num)
        }
    
        return array
    }
    return (
        <div>
            <h4>Using .map()</h4>
            {getButtonsUsingMap()}
            <h4>using for-loop</h4>
            {getButtonsUsingForLoop(5)}
        
        </div>
    )
}
