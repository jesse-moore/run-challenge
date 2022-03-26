import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/context/useAuth'
import SignInForm from '../components/forms/user/SignInForm'
import NewPasswordForm from '../components/forms/user/NewPasswordForm'
import PasswordResetForm from '../components/forms/user/PasswordResetForm'
import { useSpinner } from '../lib/context/useSpinner'
import { FormError, FormTitle } from '../components/forms/common'
import { ISignInValues } from '../lib/cognito/types'
import { FormNotif } from '../components/forms/common/FormNotif'
import SendVerificationCodeForm from '../components/forms/user/SendVerificationCodeForm'
import logger from '../api/logger'

export default function Login() {
    const auth = useAuth()
    const router = useRouter()
    const spinner = useSpinner()
    const [error, setError] = useState('')
    const [notif, setNotif] = useState('')
    const [stage, setStage] = useState(0)
    const [username, setUsername] = useState('')

    const handleLogin = async ({ username, password }: ISignInValues) => {
        setError('')
        setNotif('')
        spinner.start()
        const result = await auth.signin(username, password)
        spinner.stop()
        if (!result) {
            router.push('/profile/overview')
        } else if ('newPasswordRequired' in result && result.newPasswordRequired) {
            setStage(1)
        } else if ('error' in result && result.error.name === 'PasswordResetRequiredException') {
            setUsername(username)
            setNotif(
                'Password reset required, please enter the verification code that was sent to your email and a new password.'
            )
            setStage(2)
        } else if ('error' in result && result.error.name === 'NotAuthorizedException') {
            logger.debug(result.error.message)
            setError(result.error.message)
        } else if ('error' in result) {
            setError('Error signing in, please try again later.')
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
            setError('Error occurred resetting password, please try again later.')
        }
    }

    const handlePasswordReset = async (code: string, password: string) => {
        setError('')
        setNotif('')
        spinner.start()
        const result = await auth.completePasswordReset(code, password)
        if (!result) {
            await handleLogin({ username, password })
        } else if (result.error.name === 'CodeMismatchException') {
            setError(result.error.message)
        } else if (result.error.name === 'ExpiredCodeException') {
            setNotif('Verification code is expired, resend verification code?')
        }
        spinner.stop()
    }

    const handleSendVerificationCode = async () => {
        const result = await auth.sendVerificationCode()
        if (!result) {
            setError('')
            setNotif('Please enter the verification code that was sent to your email.')
            setStage(1)
        } else if ('error' in result && result.error.name === 'CodeDeliveryFailureException') {
            setError('Error sending confirmation code, check email address and try again.')
            setNotif('')
            setStage(0)
        } else if ('error' in result) {
            setError('Error occurred verifying user, please try again later')
            setNotif('')
            setStage(1)
        }
    }

    return (
        <div className="mx-auto w-full">
            <div className="max-w-sm flex flex-col mx-auto p-5 bg-slate-100 shadow-md rounded-lg">
                <FormTitle title="Sign Up" />
                {error && <FormError error={error} />}
                {notif && <FormNotif notif={notif} />}
                {stage === 0 && <SignInForm onSubmit={handleLogin} />}
                {stage === 1 && <NewPasswordForm onSubmit={handleNewPassword} />}
                {stage === 2 && <PasswordResetForm onSubmit={handlePasswordReset} />}
                {stage === 3 && <SendVerificationCodeForm onSubmit={handleSendVerificationCode} />}
            </div>
        </div>
    )
}
