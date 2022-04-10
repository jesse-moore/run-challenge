import { Form, Formik } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'
import { PasswordInput, TextInput } from '../common'

const validationSchema = Yup.object({
    email: Yup.string().email().required('Required'),
})

interface IEmailForm {
    onSubmit: (email: string) => void
}

const EmailForm = ({ onSubmit }: IEmailForm) => {
    return (
        <Formik<{ email: string }>
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={({ email }) => onSubmit(email)}
        >
            {({ isValid }) => {
                return (
                    <Form>
                        <div className="flex w-full justify-center flex-col gap-y-4">
                            <TextInput label="Email" name="email" type="email" showError />
                            <button
                                className="w-full rounded-md text-md font-medium bg-sky-700 disabled:bg-slate-500 disabled:text-gray-200 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                                type="submit"
                                disabled={!isValid}
                            >
                                Send verification code
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default EmailForm
