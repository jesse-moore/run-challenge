import { Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { SignUpFormDto } from '../../../dtos/SignUpFormDto'
import { useAuth } from '../../../lib/context/useAuth'
import { PasswordInput, SelectInput, TextInput } from '../common'
import { YearMonthDayInput } from '../common/YearMonthDayInput'

const validationSchema = Yup.object({
    email: Yup.string().email().required('Required'),
})

interface ISettingsForm {
    onSubmit: (values: SignUpFormDto) => void
}

const SettingsForm = ({ onSubmit }: ISettingsForm) => {
    const { user } = useAuth()

    useEffect(() => {}, [])

    return (
        <Formik<SignUpFormDto>
            initialValues={new SignUpFormDto(user)}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isValid }) => {
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
                            <button
                                className="w-full rounded-md text-md font-medium bg-sky-700 disabled:bg-slate-500 disabled:text-gray-200 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                                type="submit"
                                disabled={!isValid}
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SettingsForm
