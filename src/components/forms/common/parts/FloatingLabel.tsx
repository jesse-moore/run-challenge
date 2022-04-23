import React from 'react'

interface IFloatingLabel {
    name: string
    label: string
    isFocused: boolean
    value: number | string
    isValid: boolean
    touched: boolean
    indicateValidity?: boolean
    bgColor?: string
    disabled?: boolean
}

export const FloatingLabel = ({
    name,
    label,
    isFocused,
    isValid,
    value,
    touched,
    indicateValidity,
    bgColor = 'bg-white',
    disabled,
}: IFloatingLabel) => {
    const hasValue = typeof value === 'number' || (typeof value === 'string' && value.length > 0)
    const baseLabelClass = 'absolute -translate-y-1/2 left-1 transition-all px-1 pointer-events-none'
    const labelColor = isFocused
        ? 'text-sky-600'
        : !isValid && touched && indicateValidity
        ? 'text-red-600'
        : isValid && value && indicateValidity
        ? 'text-green-600'
        : 'text-gray-400'
    return (
        <label
            htmlFor={name}
            className={`${isFocused || hasValue ? 'text-sm top-0' : 'top-1/2 w-full pr-8'} ${baseLabelClass}`}
        >
            <div className={`${labelColor} ${isFocused || hasValue ? '' : 'w-full'} px-1 mr-2 rounded ${bgColor}`}>
                {label}
            </div>
        </label>
    )
}
