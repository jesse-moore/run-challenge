import { Form, Formik } from 'formik'
import React from 'react'
import { FormError, TextInput } from '../common'
import * as Yup from 'yup'
import { emailValdiationCode } from '../validationSchemas'

export interface IVerifyUserFormComponent {
    onSubmit: (code: string) => void
}

export interface IVerifyUserForm {
    code: string
}

export default ({ onSubmit }: IVerifyUserFormComponent) => {
    return (
        <Formik<IVerifyUserForm>
            initialValues={{
                code: '',
            }}
            validationSchema={Yup.object({
                code: emailValdiationCode,
            })}
            onSubmit={({ code }) => onSubmit(code.toString())}
        >
            <Form>
                <div className="flex w-full justify-center flex-col gap-y-4">
                    <TextInput label="Verfication Code" name="code" type="text" showError />
                    <div className="text-sm font-medium text-sky-700 -mt-4">
                        <button
                            type="button"
                            className="cursor-pointer disabled:text-gray-500"
                            onClick={() => onSubmit('resend')}
                        >
                            Resend Verification Code
                        </button>
                    </div>
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
