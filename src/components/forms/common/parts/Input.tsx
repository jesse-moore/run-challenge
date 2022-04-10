import React, { InputHTMLAttributes } from 'react'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    touched?: boolean
    error?: string
    indicateValidity?: boolean
    bgColor?: string
}

export const Input = ({ error, touched, indicateValidity, bgColor = 'bg-white', ...props }: IInput) => {
    const borderColor =
        error && touched && indicateValidity
            ? 'border-red-600'
            : !error && props.value && indicateValidity
            ? 'border-green-600'
            : 'border-gray-400'
    return (
        <input
            {...props}
            id={props.name}
            className={`${borderColor} ${bgColor} h-full w-full border px-2 transition-all rounded-sm focus:border-sky-600 focus:outline-none`}
        />
    )
}
