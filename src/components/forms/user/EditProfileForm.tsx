import React, { useEffect } from 'react'
import { Form, Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { SelectInput, TextInput } from '../common'
import { YearMonthDayInput } from '../common/YearMonthDayInput'
import { yearMonthDay } from '../validationSchemas'
import { EditProfileFormDto } from '../../../dtos/EditProfileFormDto'

interface IEditProfileForm {
    onSubmit: (values: EditProfileFormDto) => void
    initialValues: EditProfileFormDto
}

export default ({ initialValues, onSubmit }: IEditProfileForm) => {
    const validationSchema = Yup.object({
        name: Yup.string().max(25).required('Required'),
        gender: Yup.string().required('Required'),
        birthdate: Yup.object(yearMonthDay),
    })

    return (
        <Formik<EditProfileFormDto>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <EditProfileFormComponent initialValues={initialValues} />
        </Formik>
    )
}

interface EditProfileFormComponent {
    initialValues: EditProfileFormDto
}

const EditProfileFormComponent = ({ initialValues }: EditProfileFormComponent) => {
    const { isSubmitting, isValid, setValues, values } = useFormikContext<EditProfileFormDto>()
    const isChanged = !initialValues.equals(values)

    useEffect(() => {
        if (!isSubmitting && isChanged) {
            setValues(initialValues)
        }
    }, [initialValues])

    return (
        <Form>
            <div className="flex w-full justify-center flex-col gap-y-4">
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
                    className="disabled:bg-gray-400 w-full rounded-md bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                    type="submit"
                    disabled={isSubmitting || !isValid || !isChanged}
                >
                    Save
                </button>
            </div>
        </Form>
    )
}
