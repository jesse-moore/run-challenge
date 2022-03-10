import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../../lib/context/useAuth'
import { useSpinner } from '../../../lib/context/useSpinner'
import { TextInput } from '../common/'
import NewPasswordForm from './NewPasswordForm'

interface IPasswordResetForm {
    onSubmit: () => void
    email?: string
    forced?: boolean
}

const PasswordResetForm = (props: IPasswordResetForm) => {
    const router = useRouter()
    const auth = useAuth()
    const spinner = useSpinner()
    const DEFAULTNOTIF = 'Please enter your email address below and a verfication code will be sent to you'
    const DEFAULTNOTIFEMAIL = 'Please enter the verification code the was sent to your email'
    const DEFAULTNOTIFFORCEDEMAIL =
        'Password reset required, please enter the verification code the was sent to your email'
    const [error, setError] = useState('')
    const [notif, setNotif] = useState(DEFAULTNOTIF)
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (props.forced && props.email) {
            setStep(1)
            setNotif(DEFAULTNOTIFFORCEDEMAIL)
            setEmail(props.email)
        }
    }, [props.email])

    const handlePasswordReset = async (code: number, newPassword: string) => {
        spinner.start()
        const error = await auth.completePasswordReset(code.toString(), newPassword)
        spinner.stop()
        if (!error) {
            router.push('/login')
        } else if (error.name === 'ExpiredCodeException') {
            setStep(2)
            setNotif('Verification code is expired, resend verification code?')
        } else {
            setStep(0)
            setError(error.message)
        }
    }

    const handleSendVerificationCode = async (email: string) => {
        spinner.start()
        setEmail(email)
        setNotif(DEFAULTNOTIFEMAIL)
        const error = await auth.forgotPassword(email)
        spinner.stop()
        if (error) {
            setError(error.message)
        } else {
            setStep(1)
        }
    }

    return (
        <div className="max-w-md flex flex-col mx-auto p-5 bg-slate-100 shadow-md rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Reset Password</h3>
            {error ? <div className="text-sm text-red-600 font-medium mb-2">{error}</div> : null}
            {notif ? <div className="text-sm text-yellow-600 font-medium mb-2">{notif}</div> : null}
            {step === 0 && <EmailForm onSubmit={handleSendVerificationCode} />}
            {step === 1 && <NewPasswordForm onSubmit={handlePasswordReset} />}
            {step === 2 && <ResendVerificationCode onSubmit={() => handleSendVerificationCode(email)} />}
        </div>
    )
}

interface IEmailForm {
    onSubmit: (email: string) => void
}
const EmailForm = ({ onSubmit }: IEmailForm) => {
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
                    <TextInput label="Email" name="email" type="email" indicateValidity={false}/>
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

const passwordSchema = Yup.string()
    .required('New password is required')
    .min(8, 'Must be at least 8 characters long')
    .matches(/[\^$*.?\-!@#%&><|_~+=]/, 'Must contain at least 1 special character (^$*.?-!@#%&><|_~+=)')

const ResendVerificationCode = ({ onSubmit }: { onSubmit: () => void }) => {
    return (
        <div className="flex w-full justify-center flex-col gap-y-4">
            <button
                className="w-full rounded-md bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                type="button"
                onClick={onSubmit}
            >
                Resend Verfication Code
            </button>
        </div>
    )
}

export default PasswordResetForm
