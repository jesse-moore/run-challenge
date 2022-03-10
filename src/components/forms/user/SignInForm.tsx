import { Form, Formik } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'
import { PasswordInput, TextInput } from '../common'

const validationSchema = Yup.object({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
})

export interface ISignInFormValues {
    email: string
    password: string
}

interface ISignInForm {
    error: string
    onSubmit: (values) => void
}

const SignInForm = ({ error, onSubmit }: ISignInForm) => {
    return (
        <div className="max-w-sm flex flex-col mx-auto p-5 bg-slate-100 shadow-md rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Login</h3>
            {error ? <div className="text-sm text-red-600 font-medium mb-2">{error}</div> : null}
            <Formik<ISignInFormValues>
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid }) => {
                    return (
                        <Form>
                            <div className="flex w-full justify-center flex-col gap-y-4">
                                <TextInput label="Email" name="email" type="email" indicateValidity={false} />
                                <PasswordInput label="Password" name="password" indicateValidity={false} />
                                <Link href="/forgotpassword">
                                    <a>
                                        <div className="text-sm text-sky-700 -mt-7">Forgot password</div>
                                    </a>
                                </Link>
                                <button
                                    className="w-full rounded-md text-md font-medium bg-sky-700 disabled:bg-slate-500 disabled:text-gray-200 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default SignInForm
