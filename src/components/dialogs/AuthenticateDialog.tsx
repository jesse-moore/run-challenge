import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import logger from '../../api/logger'
import { useAuth } from '../../lib/context/useAuth'
import { useDialog } from '../../lib/context/useDialog'
import { useSpinner } from '../../lib/context/useSpinner'
import { Button } from '../common/Button'
import { FormError, FormTitle, PasswordInput, TextInput } from '../forms/common'
import { FormNotif } from '../forms/common/FormNotif'
import { ISignInFormValues } from '../forms/user/SignInForm'

const validationSchema = Yup.object({
    username: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
})

export const AuthenticateDialog = () => {
    const auth = useAuth()
    const spinner = useSpinner()
    const { close } = useDialog()
    const [error, setError] = useState('')
    const [notif, setNotif] = useState('Please reauthenticate to make this change.')

    const handleLogin = async ({ password }: ISignInFormValues) => {
        setError('')
        setNotif('')
        spinner.start()
        const result = await auth.signin(auth.user.email, password)
        spinner.stop()
        if (!result) {
            close(true)
        } else if ('error' in result && result.error.name === 'NotAuthorizedException') {
            setError(result.error.message)
        } else if ('error' in result) {
            setError('An error occurred reauthenticating, please try again later.')
            logger.error({
                name: result.error.name,
                message: `User: ${auth.user.email} - ${result.error.message}`,
            })
        }
    }

    return (
        <div className="max-w-sm flex flex-col mx-auto p-5 bg-slate-100 shadow-md rounded-lg">
            <FormTitle title="Reauthenticate" />
            {error && <FormError error={error} />}
            {notif && <FormNotif notif={notif} />}
            <Formik<ISignInFormValues>
                initialValues={{ username: auth.user.email, password: '', keepMeSignedIn: false }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {() => {
                    return (
                        <Form>
                            <div className="flex w-full justify-center flex-col">
                                <TextInput
                                    label="Email"
                                    name="username"
                                    type="email"
                                    indicateValidity={false}
                                    disabled
                                    bgColor="bg-slate-100"
                                />
                                <PasswordInput
                                    label="Password"
                                    name="password"
                                    indicateValidity={false}
                                    bgColor="bg-slate-100"
                                />
                            </div>
                            <div className="flex flex-row gap-x-4 px-6 pb-4 pt-2">
                                <Button title="Confirm" type="submit" data-modal-toggle="defaultModal" />
                                <Button
                                    title="Cancel"
                                    onClick={() => close(false)}
                                    data-modal-toggle="defaultModal"
                                    warning
                                    solid
                                />
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
