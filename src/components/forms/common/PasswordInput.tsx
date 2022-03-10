import { useField } from 'formik'
import React, { useState } from 'react'
import { FloatingLabel, Input, InputError, InputIconRight, InputWrapper } from './parts'
import { Visibility, VisibilityOff } from '../../icons'

export interface IPasswordInput {
    label: string
    name: string
    readonly?: boolean
    disabled?: boolean
    showError?: boolean
    indicateValidity?: boolean
}

export const PasswordInput = ({
    label,
    readonly,
    disabled,
    showError,
    indicateValidity = true,
    ...props
}: IPasswordInput) => {
    const [isFocused, setIsFocused] = useState(false)
    const [visible, setVisible] = useState(false)
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
                    type: visible ? 'text' : 'password',
                    touched: !indicateValidity ? false : touched,
                    error,
                    onChange,
                    onFocus: () => setIsFocused(true),
                    onBlur: handleBlur,
                }}
            />
            <InputIconRight onClick={() => setVisible(!visible)}>
                {visible ? <VisibilityOff /> : <Visibility />}
            </InputIconRight>
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
