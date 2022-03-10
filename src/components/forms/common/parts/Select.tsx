import React, { InputHTMLAttributes, ReactNode } from 'react'

interface ISelect extends InputHTMLAttributes<HTMLSelectElement> {
    name: string
    value: string | number
    children: ReactNode
    touched?: boolean
    error?: string
    onChange: (value: any) => void
    multiple?: boolean
    onFocus?: (value: any) => void
    onBlur?: (value: any) => void
    readonly?: boolean
    disabled?: boolean
}

export const Select = ({ error, touched, children, ...props }: ISelect) => {
    const borderColor = error && touched ? 'border-red-600' : !error && touched ? 'border-green-600' : 'border-gray-400'
    return (
        <select
            {...props}
            id={props.name}
            className={`${borderColor} h-full w-full min-w-max border pl-2 pr-8 bg-slate-100 transition-all rounded-sm focus:border-sky-600 focus:outline-none`}
        >
            {children}
        </select>
    )
}
