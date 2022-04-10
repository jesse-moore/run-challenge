import React, { useState } from 'react'
import { FormError, FormTitle } from '../components/forms/common'
import { FormNotif } from '../components/forms/common/FormNotif'
import EmailForm from '../components/forms/user/EmailForm'
import PasswordResetForm from '../components/forms/user/PasswordResetForm'
import { useAuth } from '../lib/context/useAuth'
import { useDialog } from '../lib/context/useDialog'
import { useSpinner } from '../lib/context/useSpinner'
import logger from '../api/logger'
import { useRouter } from 'next/router'

const Forgotpassword = () => {
    const auth = useAuth()
    const dialog = useDialog()
    const spinner = useSpinner()
    const router = useRouter()
    const [stage, setStage] = useState(0)
    const [error, setError] = useState('')
    const [notif, setNotif] = useState('Please enter your email and a verification code will be sent to you.')
    const [email, setEmail] = useState('')

    const handlePasswordReset = async (code: string, password: string) => {
        spinner.start()
        const result = await auth.completePasswordReset(code, password)
        spinner.stop()
        if (!result) {
            setError('')
            setNotif('')
            router.push('/login')
        } else if ('error' in result) {
            logger.error({
                name: result.error.name,
                message: `User: ${email} - ${result.error.message}`,
            })
            await dialog.alert({
                title: 'Password Reset Error',
                message: 'An error occurred resetting password, please try again later.',
            })
        }
    }

    const handleEmailSubmit = async (email: string) => {
        spinner.start()
        const result = await auth.forgotPassword(email)
        spinner.stop()
        if ('error' in result) {
            logger.error({
                name: result.error.name,
                message: `User: ${email} - ${result.error.message}`,
            })
            await dialog.alert({
                title: 'Verification Error',
                message: 'An error occurred sending verification code, please try again later.',
            })
            router.push('/')
        } else {
            setError('')
            setNotif('Please enter the verification code that was sent to your email and a new password.')
            setEmail(email)
            setStage(1)
        }
    }

    return (
        <div className="mx-auto w-full">
            <div className="max-w-sm flex flex-col mx-auto p-5 bg-slate-100 shadow-md rounded-lg">
                <FormTitle title="Forgot Password" />
                {error && <FormError error={error} />}
                {notif && <FormNotif notif={notif} />}
                {stage === 0 && <EmailForm onSubmit={handleEmailSubmit} />}
                {stage === 1 && <PasswordResetForm onSubmit={handlePasswordReset} />}
            </div>
        </div>
    )
}

export default Forgotpassword
