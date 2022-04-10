import React from 'react'

interface ILabel {
    name: string
    label: string
    value: number | string
    isValid: boolean
    touched: boolean
}

export const Label = ({ name, label, isValid, value, touched }: ILabel) => {
    const labelColor = !isValid && touched ? 'text-red-600' : isValid && value ? 'text-green-600' : 'text-gray-400'
    return (
        <label
            htmlFor={name}
            className="absolute -translate-y-1/2 left-1 transition-all px-1 pointer-events-none text-sm top-0"
        >
            <div className={`${labelColor} pl-1 mr-2 bg-slate-100`}>{label}</div>
        </label>
    )
}
