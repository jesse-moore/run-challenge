import { useField } from 'formik'
import React, { useState } from 'react'
import { FloatingLabel, Input, InputError, InputWrapper } from './parts'

export interface IDateInput {
    label: string
    name: string
    readonly?: boolean
    disabled?: boolean
    showError?: boolean
    indicateValidity?: boolean
}

export const DateInput = ({ label, readonly, disabled, showError, indicateValidity = true, ...props }: IDateInput) => {
    const [isFocused, setIsFocused] = useState(false)
    const [field, meta, helper] = useField<number | string>(props)
    const { name, value, onChange } = field
    const { error, touched } = meta

    const handleBlur = () => {
        setIsFocused(false)
        if (!touched) helper.setTouched(true)
    }

    return (
        <InputWrapper>
            <Input
                {...{
                    name,
                    value,
                    type: 'date',
                    touched: !indicateValidity ? false : touched,
                    error,
                    onChange,
                    onFocus: () => setIsFocused(true),
                    onBlur: handleBlur,
                }}
            />
            <FloatingLabel
                {...{
                    name,
                    label,
                    isFocused,
                    isValid: !error,
                    touched: !indicateValidity ? false : touched,
                    value,
                }}
            />
            {touched && error && showError ? <InputError {...{ error }} /> : null}
        </InputWrapper>
    )
}
