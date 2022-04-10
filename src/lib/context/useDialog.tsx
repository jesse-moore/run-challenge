import { resolve } from 'path'
import React, { useState, useContext, createContext, ReactNode } from 'react'

interface IDialogContext {
    alert: (config: IAlertConfig) => Promise<void>
    prompt: (config: IPromptConfig) => void
    close: (value?: any) => void
    config: IDialogConfig
    isActive: boolean
}

const DialogContext = createContext<IDialogContext>(undefined)

export function ProvideDialog({ children }: { children: ReactNode }) {
    const dialog = useProvideDialog(children)
    return <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>
}

export const useDialog = () => {
    const context = useContext(DialogContext)
    if (context === undefined) {
        throw new Error('useDialog must be within DialogProvider')
    }
    return context
}

interface IDialogBaseConfig {
    title: string
    message: string
}

export interface IAlertConfig extends IDialogBaseConfig {}
export interface IPromptConfig extends IDialogBaseConfig {}

export type IDialogConfig = IAlertConfig | IPromptConfig

function useProvideDialog(children: React.ReactNode) {
    const [promise, setPromise] = useState<{ resolve: any; reject: any } | null>()
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [type, setType] = useState<'alert' | 'prompt' | null>(null)
    const [isActive, setIsActive] = useState(false)

    const alert = async (config: IAlertConfig): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTitle(config.title)
            setMessage(config.message)
            setType('alert')
            setIsActive(true)
            setPromise({ resolve, reject })
        })
    }
    const prompt = (config: IPromptConfig) => {
        setTitle(config.title)
        setMessage(config.message)
        setType('prompt')
        setIsActive(true)
    }
    const close = (value?: any) => {
        setTitle(null)
        setMessage(null)
        setType(null)
        setIsActive(false)
        promise.resolve(value)
    }

    return {
        alert,
        prompt,
        close,
        config: { title, message, type },
        isActive,
    }
}
