import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/context/useAuth'
import SignInForm, { ISignInFormValues } from '../components/forms/user/SignInForm'
// import NewPasswordForm, { INewPasswordFormValues } from '../components/forms/user/NewPasswordForm'
import PasswordResetForm from '../components/forms/user/PasswordReset'
import { useSpinner } from '../lib/context/useSpinner'

export default function Login() {
    const router = useRouter()
    const [error, setError] = useState('')
    const [status, setStatus] = useState<number>(0) // 0 - unauthenticated, 1 - new password required, 2 - password reset
    const auth = useAuth()
    const spinner = useSpinner()

    const handleLogin = async ({ email, password }: ISignInFormValues) => {
        spinner.start()
        const { error, newPasswordRequired, passwordResetRequired, user } = await auth.signin(email, password)
        spinner.stop()
        if (error) {
            setError(error)
        } else if (newPasswordRequired) {
            setStatus(1)
        } else if (passwordResetRequired) {
            setStatus(2)
        } else {
            router.push('/profile/overview')
            // Success -> Redirect to appropriate page
        }
    }

    // const handleNewPassword = async ({ password }: INewPasswordFormValues) => {
    //     auth.completeNewPasswordChallenge(password)
    // }

    const handlePasswordReset = async () => {
        setStatus(0)
        setError('')
    }

    return (
        <div className="mx-auto w-full">
            {status === 0 ? (
                <SignInForm error={error} onSubmit={handleLogin} />
            ) : // ) : status === 1 ? (
            //     <NewPasswordForm error={error} onSubmit={handleNewPassword} forced={true} />
            status === 2 ? (
                <PasswordResetForm onSubmit={handlePasswordReset} />
            ) : null}
        </div>
    )
}
