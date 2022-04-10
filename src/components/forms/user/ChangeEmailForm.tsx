import { Form, Formik } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'
import { useAuth } from '../../../lib/context/useAuth'
import { Button } from '../../common/Button'
import { FormTitle, PasswordInput, TextInput } from '../common'

const validationSchema = Yup.object({
    email: Yup.string().email().required('Required'),
})

interface IChangeEmailForm {
    onSubmit: (email: string) => void
    onBack: () => void
}

const ChangeEmailForm = ({ onSubmit, onBack }: IChangeEmailForm) => {
    const { user } = useAuth()

    return (
        <Formik<{ email: string }>
            initialValues={{ email: user.email }}
            validationSchema={validationSchema}
            onSubmit={({ email }) => onSubmit(email)}
        >
            {({ isValid, touched, values }) => {
                const isModified = values.email !== user.email
				console.log(isModified, isValid, touched)
                return (
                    <Form>
                        <FormTitle title="Change Email" />
                        <div className="flex w-full justify-center flex-col gap-y-4">
                            <TextInput label="Email" name="email" type="email" showError />
                            <Button disabled={!isValid || !isModified} title="Save" type="submit" />
                            {isModified && <Button title="Discard Changes" warning onClick={onBack}/>}
                            {!isModified && <Button title="Back" outline onClick={onBack} />}
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ChangeEmailForm
