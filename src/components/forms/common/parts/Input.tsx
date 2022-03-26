import React, { InputHTMLAttributes } from 'react'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    touched?: boolean
    error?: string
}

export const Input = ({ error, touched, ...props }: IInput) => {
    const borderColor =
        error && touched ? 'border-red-600' : !error && props.value ? 'border-green-600' : 'border-gray-400'
    return (
        <input
            {...props}
            id={props.name}
            className={`${borderColor} h-full w-full border px-2 bg-slate-100 transition-all rounded-sm focus:border-sky-600 focus:outline-none`}
        />
    )
}
