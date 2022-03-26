import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { TextInput } from './TextInput'

interface IEmailForm {
    onSubmit: (email: string) => void
}

export default ({ onSubmit }: IEmailForm) => {
    return (
        <Formik<{ email: string }>
            initialValues={{
                email: '',
            }}
            validationSchema={Yup.object({
                email: Yup.string().email().required('Email is required'),
            })}
            onSubmit={({ email }) => onSubmit(email)}
        >
            <Form>
                <div className="flex w-full justify-center flex-col gap-y-2">
                    <TextInput label="Email" name="email" type="email" indicateValidity={false} />
                    <button
                        className="w-full rounded-md bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                        type="submit"
                    >
                        Send verfication code
                    </button>
                </div>
            </Form>
        </Formik>
    )
}
