import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { InputFloatingLabel } from '../common/InputFloatingLabel'
import { PasswordInput } from '../common/PasswordInput'

const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    currentPassword: Yup.string().required('Current password is required'),
    password: Yup.string().required('New password is required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'New passwords must match'),
})

export interface INewPasswordFormValues {
    email: string
    currentPassword: string
    password: string
    passwordConfirmation: string
}

interface INewPasswordForm {
    error: string
    onSubmit: (values) => void
    data?: { email?: string; currentPassword?: string }
    forced?: boolean
}

const NewPasswordForm = ({ error, onSubmit, data = {}, forced }: INewPasswordForm) => {
    return (
        <div className="max-w-sm flex flex-col mx-auto p-5 bg-slate-100 shadow-md rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Change Password</h3>
            {error ? <div className="text-sm text-red-600 font-medium mb-2">{error}</div> : null}
            {forced ? <div className="text-sm text-yellow-600 font-medium mb-2">New password required</div> : null}
            <Formik<INewPasswordFormValues>
                initialValues={{
                    email: data.email || '',
                    currentPassword: data.currentPassword || '',
                    password: '',
                    passwordConfirmation: '',
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <div className="flex w-full justify-center flex-col gap-y-4">
                        <InputFloatingLabel
                            label="Email"
                            name="email"
                            type="email"
                            readonly={data.email ? true : false}
                        />
                        {!forced && (
                            <InputFloatingLabel label="Current Password" name="currentPassword" type="password" />
                        )}
                        <PasswordInput label="Password" name="password" />
                        <PasswordInput label="Confirm Password" name="passwordConfirmation" />
                        <button
                            className="w-full rounded-md bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default NewPasswordForm
