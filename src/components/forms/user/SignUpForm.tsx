import React, { ReactNode, useEffect } from 'react'
import { Form, Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { PasswordInput, SelectInput, TextInput } from '../common'
import { PasswordInputWithRequirements } from '../common/PasswordInputWithRequirements'
import { YearMonthDayInput } from '../common/YearMonthDayInput'
import { password, passwordConfirmation, yearMonthDay } from '../validationSchemas'
import { SignUpFormDto } from '../../../dtos/SignUpFormDto'

interface ISignUpFormWrapper {
    onSubmit: (values: SignUpFormDto) => void
    existingEmails?: string[]
    children: ReactNode
}

const SignUpFormWrapper = ({ onSubmit, children, existingEmails = [] }: ISignUpFormWrapper) => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email()
            .required('Required')
            .notOneOf(existingEmails, 'A user with this email already exists.'),
        name: Yup.string().max(25).required('Required'),
        password,
        confirmPassword: passwordConfirmation,
        gender: Yup.string().required('Required'),
        birthdate: Yup.object(yearMonthDay),
    })

    return (
        <Formik<SignUpFormDto>
            initialValues={new SignUpFormDto()}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {children}
        </Formik>
    )
}

interface ISignUpForm {
    error?: string
    existingEmails?: string[]
}

const SignUpForm = ({ error, existingEmails = [] }: ISignUpForm) => {
    const { isSubmitting, isValid, validateForm } = useFormikContext<SignUpFormDto>()

    useEffect(() => {
        validateForm()
    }, [existingEmails])

    return (
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
                    className="disabled:bg-gray-400 w-full rounded-md bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                    type="submit"
                    disabled={isSubmitting || !!error || !isValid}
                >
                    Submit
                </button>
            </div>
        </Form>
    )
}

interface ISignUpFormComponent {
    onSubmit: (values: SignUpFormDto) => void
    existingEmails?: string[]
    error?: string
}

export default function ({ onSubmit, error, existingEmails = [] }: ISignUpFormComponent) {
    return (
        <SignUpFormWrapper {...{ onSubmit, existingEmails }}>
            <SignUpForm {...{ error, existingEmails }} />
        </SignUpFormWrapper>
    )
}
