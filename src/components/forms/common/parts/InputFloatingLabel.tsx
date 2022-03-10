import { useField } from 'formik'
import React, { useState } from 'react'

interface IInputFloatingLabel {
    label: string
    name: string
    type: string
    readonly?: boolean
    disabled?: boolean
    min?: number
    max?: number
}
export const InputFloatingLabel = ({ label, type, readonly, disabled, min, max, ...props }: IInputFloatingLabel) => {
    const [isfocused, setIsFocused] = useState(false)
    const [field, meta, helper] = useField<number | string>(props)

    const handleBlur = () => {
        setIsFocused(false)
        if (!meta.touched) helper.setTouched(true)
    }

    const baseLabelClass = 'absolute bg-slate-100 -translate-y-1/2 left-2 transition-all px-1 pointer-events-none'
    const hasValue = typeof meta.value === 'number' || (typeof meta.value === 'string' && meta.value.length > 0)
    return (
        <div className="relative mb-4">
            <input
                {...field}
                id={props.name}
                type={type}
                className="h-full w-full border border-gray-400 px-2 bg-slate-100 transition-all rounded-sm focus:border-sky-600 focus:outline-none"
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                readOnly={readonly}
                disabled={disabled}
                min={min}
                max={max}
            />
            <label
                htmlFor={props.name}
                className={`${isfocused ? 'text-sky-600 ' : 'text-gray-400'} ${
                    isfocused || hasValue ? 'text-sm top-0' : 'top-1/2'
                } ${baseLabelClass}`}
            >
                {label}
            </label>
            {meta.touched && meta.error ? (
                <div className="absolute text-sm text-red-600 font-medium">{meta.error}</div>
            ) : null}
        </div>
    )
}
