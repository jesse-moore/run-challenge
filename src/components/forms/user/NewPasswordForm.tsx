import { Form, Formik } from 'formik'
import React from 'react'
import { PasswordInput, TextInput } from '../common/'
import * as Yup from 'yup'
import { emailValdiationCode, password, passwordConfirmation } from '../validationSchemas'
import { PasswordInputWithRequirements } from '../common/PasswordInputWithRequirements'

export interface INewPasswordFormComponent {
    onSubmit: (code: number, newPassword: string) => void
}

export interface INewPasswordForm {
    code: string
    password: string
    passwordConfirmation: string
}

export default ({ onSubmit }: INewPasswordFormComponent) => {
    return (
        <Formik<INewPasswordForm>
            initialValues={{
                code: '',
                password: '',
                passwordConfirmation: '',
            }}
            validationSchema={Yup.object({
                code: emailValdiationCode,
                password: password,
                passwordConfirmation: passwordConfirmation,
            })}
            onSubmit={({ code, password }) => onSubmit(Number(code), password)}
        >
            <Form>
                <div className="flex w-full justify-center flex-col gap-y-4">
                    <TextInput label="Verfication Code" name="code" type="number" min={100000} max={999999} />
                    <PasswordInput label="Password" name="password" />
                    <PasswordInputWithRequirements label="Password" name="password" validationSchema={password} />
                    <PasswordInput label="Confirm Password" name="passwordConfirmation" showError />
                    <button
                        className="w-full rounded-md bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </Form>
        </Formik>
    )
}
