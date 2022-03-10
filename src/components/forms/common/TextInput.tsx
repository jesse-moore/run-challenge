import { useField } from 'formik'
import React, { InputHTMLAttributes, useState } from 'react'
import { FloatingLabel, Input, InputError, InputWrapper } from './parts'

export interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    readonly?: boolean
    showError?: boolean
    indicateValidity?: boolean
}

export const TextInput = ({
    label,
    readonly,
    showError,
    type = 'text',
    indicateValidity = true,
    ...props
}: ITextInput) => {
    const [isFocused, setIsFocused] = useState(false)
    const [field, meta, helper] = useField<string>(props.name)
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
                    type,
                    touched: !indicateValidity ? false : touched,
                    error,
                    onChange,
                    onFocus: () => setIsFocused(true),
                    onBlur: handleBlur,
					...props
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
