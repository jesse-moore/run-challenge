import { Form, Formik, useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useAuth } from '../../../lib/context/useAuth'
import { Button } from '../../common/Button'
import { TextInput } from '../common'

interface IChangeEmailForm {
    onBack: () => void
    handleChangeEmail: (email: string) => void | Promise<any>
    existingEmails?: string[]
}

export const ChangeEmailForm = ({ existingEmails, onBack, handleChangeEmail }: IChangeEmailForm) => {
    const { user } = useAuth()

    const validationSchema = Yup.object({
        email: Yup.string()
            .email()
            .required('Required')
            .notOneOf(existingEmails, 'A user with this email already exists.'),
    })

    return (
        <Formik<{ email: string }>
            initialValues={{ email: user.email }}
            validationSchema={validationSchema}
            onSubmit={({ email }) => handleChangeEmail(email)}
        >
            <ChangeEmailFormComponent {...{ onBack, existingEmails }} />
        </Formik>
    )
}

interface IChangeEmailFormComponent {
    onBack: () => void
    existingEmails?: string[]
}

export const ChangeEmailFormComponent = ({ onBack, existingEmails }: IChangeEmailFormComponent) => {
    const { values, isValid, validateForm } = useFormikContext<{ email: string }>()
    const { user } = useAuth()

    useEffect(() => {
        validateForm()
    }, [existingEmails])

    const isModified = values.email !== user.email
    return (
        <Form>
            <div className="flex w-full justify-center flex-col gap-y-4">
                <TextInput label="Email" name="email" type="email" showError />
                <Button disabled={!isValid || !isModified} title="Save" type="submit" />
                {isModified && <Button title="Discard Changes" warning onClick={onBack} />}
                {!isModified && <Button title="Back" outline onClick={onBack} />}
            </div>
        </Form>
    )
}
