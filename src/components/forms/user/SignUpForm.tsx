import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PasswordInput, SelectInput, TextInput } from '../common'
import { PasswordInputWithRequirements } from '../common/PasswordInputWithRequirements'
import { YearMonthDayInput } from '../common/YearMonthDayInput'
import { password, passwordConfirmation, yearMonthDay } from '../validationSchemas'

const validationSchema = Yup.object({
    email: Yup.string().email().required('Required'),
    name: Yup.string().max(25).required('Required'),
    password,
    confirmPassword: passwordConfirmation,
    gender: Yup.string().required('Required'),
    birthdate: Yup.object(yearMonthDay),
})

interface ISignInForm {
    email: string
    password: string
    confirmPassword: string
    gender: string
    name: string
    birthdate: { year: string; month: string; day: string }
}

const SignInForm = () => {
    return (
        <div className="max-w-md flex flex-col mx-auto p-5 bg-slate-100 shadow-md rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Sign Up</h3>
            <Formik<ISignInForm>
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    gender: '',
                    name: '',
                    birthdate: { year: '', month: '', day: '' },
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log(values)}
            >
                <Form>
                    <div className="flex w-full justify-center flex-col gap-y-4">
                        <TextInput label="Email" name="email" type="email" showError />
                        <TextInput label="Name" name="name" type="text" showError />
                        <YearMonthDayInput label="Birthdate" name="birthdate" showError />
                        <SelectInput
                            label="Gender"
                            name="gender"
                            options={[
                                { name: 'Male', value: 'male' },
                                { name: 'Female', value: 'female' },
                                { name: 'Other', value: 'other' },
                            ]}
                            showError
                        />
                        <PasswordInputWithRequirements label="Password" name="password" validationSchema={password} />
                        <PasswordInput label="Confirm Password" name="confirmPassword" showError />
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

export default SignInForm
