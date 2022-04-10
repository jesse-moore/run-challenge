import { Form, Formik } from 'formik'
import Link from 'next/link'
import React from 'react'
import * as Yup from 'yup'
import { ISignInValues } from '../../../lib/cognito/types'
import { PasswordInput, TextInput } from '../common'
import { CheckBoxInput } from '../common/CheckBox'

const validationSchema = Yup.object({
    username: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
    keepMeSignedIn: Yup.boolean().required('Required'),
})

interface ISignInForm {
    onSubmit: (values: ISignInFormValues) => void
}

export interface ISignInFormValues extends ISignInValues {
    keepMeSignedIn: boolean
}

const SignInForm = ({ onSubmit }: ISignInForm) => {
    return (
        <Formik<ISignInFormValues>
            initialValues={{ username: '', password: '', keepMeSignedIn: false }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {() => {
                return (
                    <Form>
                        <div className="flex w-full justify-center flex-col gap-y-4">
                            <TextInput label="Email" name="username" type="email" indicateValidity={false} />
                            <PasswordInput label="Password" name="password" indicateValidity={false} />
                            <Link href="/forgotpassword">
                                <a>
                                    <div className="text-sm text-sky-700 -mt-7">Forgot password</div>
                                </a>
                            </Link>
                            <div className='-mt-2'>
                                <CheckBoxInput label="Keep Me Signed In" name="keepMeSignedIn" />
                            </div>
                            <button
                                className="w-full rounded-md text-md font-medium bg-sky-700 disabled:bg-slate-500 disabled:text-gray-200 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SignInForm
