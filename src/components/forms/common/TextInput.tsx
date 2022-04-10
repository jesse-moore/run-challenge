import { useField } from 'formik'
import React, { InputHTMLAttributes, useState } from 'react'
import { FloatingLabel, Input, InputError, InputWrapper } from './parts'

export interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    readonly?: boolean
    showError?: boolean
    indicateValidity?: boolean
    bgColor?: string
}

export const TextInput = ({
    label,
    readonly,
    showError,
    type = 'text',
    indicateValidity = true,
    name,
    bgColor,
    ...props
}: ITextInput) => {
    const [isFocused, setIsFocused] = useState(false)
    const [field, meta, helper] = useField<string>(name)
    const { value, onChange } = field
    const { error, touched } = meta

    const handleBlur = () => {
        setIsFocused(false)
        if (!touched) helper.setTouched(true)
    }
    return (
        <InputWrapper>
            <Input
                {...{
                    ...props,
                    ...field,
                    type,
                    touched,
                    indicateValidity,
                    error,
                    onChange,
                    onFocus: () => setIsFocused(true),
                    onBlur: handleBlur,
                    bgColor,
                }}
            />
            <FloatingLabel
                {...{
                    name,
                    label,
                    isFocused,
                    isValid: !error,
                    touched,
                    indicateValidity,
                    value,
                    bgColor,
                }}
            />
            {touched && error && showError ? <InputError {...{ error }} /> : null}
        </InputWrapper>
    )
}
