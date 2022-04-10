import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/context/useAuth'
import SignInForm, { ISignInFormValues } from '../components/forms/user/SignInForm'
import NewPasswordForm from '../components/forms/user/NewPasswordForm'
import PasswordResetForm from '../components/forms/user/PasswordResetForm'
import { useSpinner } from '../lib/context/useSpinner'
import { FormError, FormTitle } from '../components/forms/common'
import { ISignInValues } from '../lib/cognito/types'
import { FormNotif } from '../components/forms/common/FormNotif'
import SendVerificationCodeForm from '../components/forms/user/SendVerificationCodeForm'
import logger from '../api/logger'
import VerifyUserForm from '../components/forms/user/VerifyUserForm'
import { useDialog } from '../lib/context/useDialog'
import APPSETTINGS from '../constants/APPSETTINGS'

export default function Login() {
    const auth = useAuth()
    const router = useRouter()
    const spinner = useSpinner()
    const dialog = useDialog()
    const [error, setError] = useState('')
    const [notif, setNotif] = useState('')
    const [stage, setStage] = useState(0)
    const [signInValues, setSignInValues] = useState<ISignInFormValues>({
        username: '',
        password: '',
        keepMeSignedIn: false,
    })
    const [emailsSent, setEmailsSent] = useState(0)

    const handleLogin = async ({ username, password, keepMeSignedIn }: ISignInFormValues) => {
        setError('')
        setNotif('')
        spinner.start()
        const result = await auth.signin(username, password, keepMeSignedIn)
        spinner.stop()
        if (!result) {
            router.push('/profile/overview')
        } else if ('newPasswordRequired' in result && result.newPasswordRequired) {
            setNotif('New password required')
            setStage(1)
        } else if ('error' in result && result.error.name === 'PasswordResetRequiredException') {
            setSignInValues({ username, password, keepMeSignedIn })
            setNotif(
                'Password reset required, please enter the verification code that was sent to your email and a new password.'
            )
            setStage(2)
        } else if ('error' in result && result.error.name === 'UserNotConfirmedException') {
            setSignInValues({ username, password, keepMeSignedIn })
            setNotif(
                'Account is not confirmed, enter the verification code that was sent to your email to confirm your account. .'
            )
            setStage(4)
        } else if ('error' in result && result.error.name === 'NotAuthorizedException') {
            setError(result.error.message)
        } else if ('error' in result) {
            logger.error({
                name: result.error.name,
                message: `User: ${signInValues.username} - ${result.error.message}`,
            })
            await dialog.alert({
                title: 'Login Error',
                message: 'An error occurred logging in, please try again later.',
            })
            router.push('/')
        } else {
            router.push('/profile/overview')
        }
    }

    const handleNewPassword = async (password: string) => {
        setError('')
        setNotif('')
        spinner.start()
        const result = await auth.completeNewPasswordChallenge(password)
        spinner.stop()
        if (!result) {
            router.push('/profile/overview')
        } else {
            logger.error({
                name: result.error.name,
                message: `User: ${signInValues.username} - ${result.error.message}`,
            })
            await dialog.alert({
                title: 'Login Error',
                message: 'An error occurred logging in, please try again later.',
            })
            router.push('/')
        }
    }

    const handlePasswordReset = async (code: string, password: string) => {
        setError('')
        setNotif('')
        spinner.start()
        const result = await auth.completePasswordReset(code, password)
        if (!result) {
            await handleLogin(signInValues)
        } else if (result.error.name === 'CodeMismatchException') {
            setError(result.error.message)
        } else if (result.error.name === 'ExpiredCodeException') {
            setNotif('Verification code is expired, resend verification code?')
            setStage(3)
        } else {
            logger.error({
                name: result.error.name,
                message: `User: ${signInValues.username} - ${result.error.message}`,
            })
            await dialog.alert({
                title: 'Login Error',
                message: 'An error occurred logging in, please try again later.',
            })
            router.push('/')
        }
        spinner.stop()
    }

    const handleSendVerificationCode = async (confirmUser?: boolean) => {
        spinner.start()
        const result = await auth.sendVerificationCode()
        spinner.stop()
        if (!result) {
            setError('')
            setNotif('Please enter the verification code that was sent to your email.')
            setEmailsSent(emailsSent + 1)
            confirmUser ? setStage(4) : setStage(1)
        } else if ('error' in result) {
            logger.error({
                name: result.error.name,
                message: `User: ${signInValues.username} - ${result.error.message}`,
            })
            await dialog.alert({
                title: 'Verification Error',
                message: 'An error occurred sending verification code, please try again later.',
            })
            router.push('/')
        }
    }

    const handleVerifyUser = async (code: string) => {
        setError('')
        if (code === 'resend' && emailsSent >= APPSETTINGS.MAXVERIFICATIONEMAILS) {
            await dialog.alert({
                title: 'Max Verifications Sent',
                message: 'Please contact administator to complete signup',
            })
            logger.warning({
                name: 'MaxEmailsSent',
                message: `Max verifications sent on signup (${emailsSent}) for user ${signInValues.username}`,
            })
            return
        }
        if (code === 'resend') {
            setNotif('Resending verification code...')
            await handleSendVerificationCode(true)
            setEmailsSent(emailsSent + 1)
            return
        }
        spinner.start()
        const result = await auth.verifyUser(code)
        spinner.stop()
        if (!result) {
            handleLogin(signInValues)
        } else if (result.error.name === 'CodeMismatchException') {
            setError(result.error.message)
        } else if (result.error.name === 'ExpiredCodeException') {
            setNotif('Verification code is expired, resend verification code?')
            setStage(3)
        } else {
            logger.error({ name: result.error.name, message: result.error.message })
            await dialog.alert({
                title: 'Registration Error',
                message: 'An error occurred verifying user, please try again later.',
            })
            router.push('/')
        }
    }

    return (
        <div className="mx-auto w-full">
            <div className="max-w-sm flex flex-col mx-auto p-5 bg-slate-100 shadow-md rounded-lg">
                <FormTitle title="Login" />
                {error && <FormError error={error} />}
                {notif && <FormNotif notif={notif} />}
                {stage === 0 && <SignInForm onSubmit={handleLogin} />}
                {stage === 1 && <NewPasswordForm onSubmit={handleNewPassword} />}
                {stage === 2 && <PasswordResetForm onSubmit={handlePasswordReset} />}
                {stage === 3 && (
                    <SendVerificationCodeForm onSubmit={handleSendVerificationCode} handleBack={() => setStage(2)} />
                )}
                {stage === 4 && <VerifyUserForm onSubmit={handleVerifyUser} />}
            </div>
        </div>
    )
}
