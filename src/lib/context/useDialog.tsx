import { resolve } from 'path'
import React, { useState, useContext, createContext, ReactNode } from 'react'
import { OnAfterOpenCallback } from 'react-modal'

interface IDialogContext {
    alert: (config: IAlertConfig) => Promise<void>
    prompt: (config: IPromptConfig) => Promise<boolean>
    custom: <T>(Component: JSX.Element, config?: ICustomConfig) => Promise<T>
    close: (value?: any) => void
    config: IAlertConfig | IPromptConfig | ICustomConfig
    isActive: boolean
    type: 'alert' | 'prompt' | 'custom'
    Component: JSX.Element
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

export interface IDialogBaseConfig {
    title: string
    /* Function that will be run after the modal has opened. */
    onAfterOpen?: OnAfterOpenCallback | undefined

    /* Function that will be run after the modal has closed. */
    onAfterClose?(): void

    /* Function that will be run when the modal is requested to be closed, prior to actually closing. */
    onRequestClose?(event: React.MouseEvent | React.KeyboardEvent): void

    /* Number indicating the milliseconds to wait before closing the modal. Defaults to zero (no timeout). */
    closeTimeoutMS?: number | undefined

    /* Boolean indicating if the appElement should be hidden. Defaults to true. */
    ariaHideApp?: boolean | undefined

    /* Boolean indicating if the modal should be focused after render */
    shouldFocusAfterRender?: boolean | undefined

    /* Boolean indicating if the overlay should close the modal. Defaults to true. */
    shouldCloseOnOverlayClick?: boolean | undefined

    /* Boolean indicating if pressing the esc key should close the modal */
    shouldCloseOnEsc?: boolean | undefined

    /* Boolean indicating if the modal should restore focus to the element that had focus prior to its display. */
    shouldReturnFocusAfterClose?: boolean | undefined

    /* Boolean indicating if the modal should use the preventScroll flag when restoring focus to the element that had focus prior to its display. */
    preventScroll?: boolean | undefined

    /* String indicating how the content container should be announced to screenreaders. */
    contentLabel?: string | undefined
}

export interface IAlertConfig extends IDialogBaseConfig {
    message: string
}
export interface IPromptConfig extends IDialogBaseConfig {
    message: string
}
export interface ICustomConfig extends IDialogBaseConfig {}

export type IDialogConfig = IAlertConfig | IPromptConfig

function useProvideDialog(children: React.ReactNode) {
    const [promise, setPromise] = useState<{ resolve: any; reject: any } | null>()
    const [Component, setComponent] = useState<JSX.Element>(null)
    const [config, setConfig] = useState({ title: '' })
    const [type, setType] = useState<'alert' | 'prompt' | 'custom' | null>(null)
    const [isActive, setIsActive] = useState(false)

    const alert = async (config: IAlertConfig): Promise<void> => {
        return new Promise((resolve, reject) => {
            setConfig(config)
            setType('alert')
            setIsActive(true)
            setPromise({ resolve, reject })
        })
    }
    const prompt = async (config: IPromptConfig): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            setConfig(config)
            setType('prompt')
            setIsActive(true)
            setPromise({ resolve, reject })
        })
    }

    const custom = async <T,>(Component: JSX.Element, config: IDialogBaseConfig): Promise<T> => {
        return new Promise((resolve, reject) => {
            setType('custom')
            setConfig(config)
            setComponent(Component)
            setIsActive(true)
            setPromise({ resolve, reject })
        })
    }
    const close = (value?: any) => {
        setConfig({ title: '' })
        setType(null)
        setIsActive(false)
        promise.resolve(value)
    }

    return {
        alert,
        prompt,
        close,
        custom,
        Component,
        config,
        isActive,
        type,
    }
}
