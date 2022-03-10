import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react'

interface ISpinnerContext {
    start: () => void
    stop: () => void
    isActive: boolean
}

const SpinnerContext = createContext<ISpinnerContext>(undefined)

export function ProvideSpinner({ children }: { children: ReactNode }) {
    const spinner = useProvideSpinner(children)
    return <SpinnerContext.Provider value={spinner}>{children}</SpinnerContext.Provider>
}

export const useSpinner = () => {
    const context = useContext(SpinnerContext)
    if (context === undefined) {
        throw new Error('useSpinner must be within SpinnerProvider')
    }
    return context
}

function useProvideSpinner(children: React.ReactNode) {
    const [isActive, setIsActive] = useState(false)

    const start = () => setIsActive(true)
    const stop = () => setIsActive(false)

    return {
        start,
        stop,
        isActive,
    }
}
