import React, { useState, useContext, createContext, ReactNode } from 'react'

interface IUIContext {
    setTabIndex: (i: number) => void
    tabIndex: number
    prevTabIndex: number
}

const UIContext = createContext<IUIContext>(undefined)

export function ProvideUI({ children }: { children: ReactNode }) {
    const spinner = useProvideUI()
    return <UIContext.Provider value={spinner}>{children}</UIContext.Provider>
}

export const useUI = () => {
    const context = useContext(UIContext)
    if (context === undefined) {
        throw new Error('useUI must be within UIProvider')
    }
    return context
}

function useProvideUI() {
    const [tabIndex, _setTabIndex] = useState(0)
    const [prevTabIndex, setPrevTabIndex] = useState(0)

    const setTabIndex = (i: number) => {
        setPrevTabIndex(tabIndex)
        _setTabIndex(i)
    }

    return {
        setTabIndex,
        tabIndex,
        prevTabIndex,
    }
}
