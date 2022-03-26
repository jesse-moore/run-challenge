import { useField } from 'formik'
import React, { useEffect, useState } from 'react'
import { AnySchema } from 'yup/lib/schema'
import { PasswordInput } from '.'
import { PasswordRequirement, PasswordRequirements } from './PasswordRequirements'

export interface IPasswordInputWithRequirements {
    label: string
    name: string
    readonly?: boolean
    disabled?: boolean
    validationSchema: AnySchema<string>
}

export const PasswordInputWithRequirements = ({ validationSchema, ...props }: IPasswordInputWithRequirements) => {
    const [passwordRequirements, setPasswordRequirements] = useState<string[]>([])
    const [passwordErrors, setPasswordErrors] = useState<string[]>([])
    const [field, meta] = useField<number | string>(props.name)

    useEffect(() => {
        try {
            validationSchema.validateSync(field.value, { abortEarly: false })
        } catch (error) {
            setPasswordRequirements(error.errors)
        }
    }, [])

    useEffect(() => {
        try {
            validationSchema.validateSync(field.value, { abortEarly: false })
            setPasswordErrors([])
        } catch (error) {
            setPasswordErrors(error.errors)
        }
    }, [field.value])

    return (
        <>
            <PasswordInput {...props} />
            <PasswordRequirements>
                {passwordRequirements.map((req, i) => {
                    if (i === 0) return null
                    return (
                        <PasswordRequirement
                            key={req}
                            requirement={req}
                            isValid={!passwordErrors.includes(req)}
                            isTouched={meta.touched}
                        />
                    )
                })}
            </PasswordRequirements>
        </>
    )
}
