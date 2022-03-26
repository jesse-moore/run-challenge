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
}

export const SelectInput = ({ label, options, showError, indicateValidity = true, name, ...props }: ISelectInput) => {
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
                {...{ name, value, onChange, touched, error, onBlur: handleBlur, onFocus: () => setIsFocused(true) }}
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
                    touched: !indicateValidity ? false : touched,
                    value,
                }}
            />
            {touched && error && showError ? <InputError {...{ error }} /> : null}
        </InputWrapper>
    )
}
