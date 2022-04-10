import { useState } from 'react'
import SignUpForm from '../components/forms/user/SignUpForm'
import SendVerificationCodeForm from '../components/forms/user/SendVerificationCodeForm'
import VerifyUserForm from '../components/forms/user/VerifyUserForm'
import { SignUpDto } from '../dtos/SignUpDto'
import { SignUpFormDto } from '../dtos/SignUpFormDto'
import { clientMapper } from '../lib/automapper/clientMapper'
import { useAuth } from '../lib/context/useAuth'
import { useRouter } from 'next/router'
import { FormError, FormTitle } from '../components/forms/common'
import type { ISignInValues } from '../lib/cognito/types'
import { FormNotif } from '../components/forms/common/FormNotif'
import { useSpinner } from '../lib/context/useSpinner'
import APPSETTINGS from '../constants/APPSETTINGS'
import { FormSuccess } from '../components/forms/common/FormSuccess'
import { useDialog } from '../lib/context/useDialog'
import logger from '../api/logger'

export default function SignUp() {
    const auth = useAuth()
    const router = useRouter()
    const spinner = useSpinner()
    const dialog = useDialog()
    const [error, setError] = useState('')
    const [notif, setNotif] = useState('')
    const [success, setSuccess] = useState('')
    const [existingEmails, setExistingEmails] = useState<string[]>([])
    const [signInValues, setSignInValues] = useState<ISignInValues>({ username: '', password: '' })
    const [stage, setStage] = useState(0)
    const [emailsSent, setEmailsSent] = useState(0)

    const handleSignUp = async (signUpFormValues: SignUpFormDto) => {
        const signUpValues = clientMapper.map(signUpFormValues, SignUpDto, SignUpFormDto)
        spinner.start()
        const result = await auth.signup(signUpValues)
        spinner.stop()
        if (!result) {
            router.push('/login')
        } else if ('error' in result && result.error.name === 'UsernameExistsException') {
            setExistingEmails([...existingEmails, signUpValues.username])
        } else if ('error' in result && result.error.name === 'CodeDeliveryFailureException') {
            setError('Error sending confirmation code, check email address and try again.')
        } else if ('error' in result) {
            logger.error({ name: result.error.name, message: result.error.message })
            await dialog.alert({
                title: 'Registration Error',
                message: 'Error occurred registering user, please try again later.',
            })
            router.push('/')
        } else if (!result.userConfirmed) {
            setError('')
            setNotif('Please enter the verification code that was sent to your email.')
            setSignInValues({ username: signUpFormValues.email, password: signUpFormValues.password })
            setStage(1)
        } else {
            router.push('/login')
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
            spinner.start()
            setNotif('Resending verification code...')
            await handleSendVerificationCode()
            setEmailsSent(emailsSent + 1)
            spinner.stop()
            return
        }
        spinner.start()
        const result = await auth.verifyUser(code)
        spinner.stop()
        if (!result) {
            setSuccess('User confirmed successfully, signing in...')
            handleSignIn()
        } else if (result.error.name === 'CodeMismatchException') {
            setError(result.error.message)
        } else if (result.error.name === 'ExpiredCodeException') {
            setNotif('Verification code is expired, resend verification code?')
            setStage(2)
        } else {
            logger.error({ name: result.error.name, message: result.error.message })
            await dialog.alert({
                title: 'Registration Error',
                message: 'An error occurred verifying user, please try again later.',
            })
            router.push('/')
        }
    }

    const handleSendVerificationCode = async () => {
        const result = await auth.sendVerificationCode()
        if (!result) {
            setError('')
            setNotif('Please enter the verification code that was sent to your email.')
            setStage(1)
            setEmailsSent(emailsSent + 1)
        } else if ('error' in result && result.error.name === 'CodeDeliveryFailureException') {
            setError('Error sending confirmation code, check email address and try again.')
            setNotif('')
            setStage(0)
        } else if ('error' in result) {
            logger.error({ name: result.error.name, message: result.error.message })
            await dialog.alert({
                title: 'Registration Error',
                message: 'An error occurred sending verification code, please try verifying your account later.',
            })
            router.push('/')
        }
    }

    const handleSignIn = async () => {
        setError('')
        setNotif('')
        const { username, password } = signInValues
        spinner.start()
        const result = await auth.signin(username, password)
        spinner.stop()
        if (!result) {
            router.push('/profile/overview')
        } else {
            const message = 'error' in result ? `${result.error.name} - ${result.error.message}` : result
            logger.error({ name: 'LogInAfterSignUp', message: `Username: ${username}, ${message}` })
            await dialog.alert({
                title: 'Log In Error',
                message: 'An error occurred auto logging in, please try logging in manaully.',
            })
            router.push('/login')
        }
    }

    return (
        <div className="mx-auto w-full">
            <div className="max-w-md flex flex-col mx-auto p-5 bg-slate-100 shadow-md rounded-lg">
                <FormTitle title="Sign Up" />
                {error && <FormError error={error} />}
                {notif && <FormNotif notif={notif} />}
                {success && <FormSuccess message={success} />}
                {stage === 0 && <SignUpForm {...{ onSubmit: handleSignUp, existingEmails, error }} />}
                {stage === 1 && <VerifyUserForm onSubmit={handleVerifyUser} />}
                {stage === 2 && (
                    <SendVerificationCodeForm onSubmit={handleSendVerificationCode} handleBack={() => setStage(1)} />
                )}
            </div>
        </div>
    )
}
