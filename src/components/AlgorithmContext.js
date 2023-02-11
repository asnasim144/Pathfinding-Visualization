import React, {useContext, useState} from 'react'

const AlgorithmContext= React.createContext()

export default function AlgorithmProvider({children}) {
    
    const [random, setRandom] = useState('random')
    return (
        <AlgorithmContext.Provider value={random}>
            {children}
        </AlgorithmContext.Provider>
    )
}
