import React, { useState } from 'react'
import { useField } from 'formik'
import { FloatingLabel, InputError, InputWrapper } from './parts'
import { Select } from './parts/Select'

interface ISelectInput {
    name: string
    label: string
    options: { name: string; value: string }[]
    indicateValidity?: boolean
    showError?: boolean
    bgColor?: string
}

export const SelectInput = ({
    label,
    options,
    showError,
    indicateValidity = true,
    name,
    bgColor = 'bg-white',
    ...props
}: ISelectInput) => {
    const [isFocused, setIsFocused] = useState(false)
    const [field, meta, helper] = useField<number | string>(name)
    const { value, onChange } = field
    const { error, touched } = meta

    const handleBlur = () => {
        setIsFocused(false)
        if (!touched) {
            helper.setTouched(true)
        }
    }

    return (
        <InputWrapper>
            <Select
                {...{
                    name,
                    value,
                    onChange,
                    touched,
                    error,
                    onBlur: handleBlur,
                    bgColor,
                    onFocus: () => setIsFocused(true),
                }}
            >
                <option value="">-- select an option --</option>
                {options.map(({ name, value }) => (
                    <option value={value} key={value}>
                        {name}
                    </option>
                ))}
            </Select>
            <FloatingLabel
                {...{
                    name,
                    label,
                    isFocused,
                    isValid: !error,
                    touched,
                    value,
                    bgColor,
                    indicateValidity,
                }}
            />
            {touched && error && showError ? <InputError {...{ error }} /> : null}
        </InputWrapper>
    )
}
