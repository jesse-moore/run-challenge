import React, { ReactElement, useEffect, useState } from 'react'
import { Button } from '../../../components/common/Button'
import logger from '../../../api/logger'
import { ProtectedRoute } from '../../../components/common/ProtectedRoute'
import { AuthenticateDialog } from '../../../components/dialogs/AuthenticateDialog'
import ProfileLayout from '../../../components/profile/profileLayout'
import { useAuth } from '../../../lib/context/useAuth'
import { useDialog } from '../../../lib/context/useDialog'
import { useSpinner } from '../../../lib/context/useSpinner'
import { ChangeEmailForm } from '../../../components/forms/user/ChangeEmailForm'
import { FormNotif } from '../../../components/forms/common/FormNotif'
import { FormError, FormTitle } from '../../../components/forms/common'
import VerifyUserForm from '../../../components/forms/user/VerifyUserForm'
import APPSETTINGS from '../../../constants/APPSETTINGS'
import { useRouter } from 'next/router'

export default function VerifyEmail() {
    const { user, ...auth } = useAuth()
    const router = useRouter()
    const dialog = useDialog()
    const spinner = useSpinner()
    const [notif, setNotif] = useState('')
    const [error, setError] = useState('')
    const [stage, setStage] = useState(0)
    const [existingEmails, setExistingEmails] = useState<string[]>([])
    const [emailsSent, setEmailsSent] = useState(0)

    useEffect(() => {
        setNotif('Please enter the verification code sent to your email address.')
    }, [])

    const reauthenticate = async (): Promise<boolean> => {
        return await dialog.custom(<AuthenticateDialog />, {
            title: 'authenticate',
            shouldCloseOnEsc: false,
            shouldCloseOnOverlayClick: false,
        })
    }

    const handleVerifyUser = async (code: string) => {
        setError('')
        const authenticated = auth.checkAuthenticationStatus()
        if (!authenticated) {
            const result = await reauthenticate()
            if (!result) return
        }
        if (code === 'resend' && emailsSent >= APPSETTINGS.MAXVERIFICATIONEMAILS) {
            await dialog.alert({
                title: 'Max Verifications Sent',
                message: 'Please contact administator to complete signup',
            })
            logger.warning({
                name: 'MaxEmailsSent',
                message: `Max verifications sent on signup (${emailsSent}) for user ${user.username}`,
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
        const result = await auth.verifyUserAttribute('email', code)
        spinner.stop()
        if (!result) {
            router.push('/profile/account')
        } else if (result.error.name === 'CodeMismatchException') {
            setError(result.error.message)
        } else if (result.error.name === 'ExpiredCodeException') {
            setNotif('Verification code is expired, resend verification code?')
            setStage(2)
        } else {
            logger.error({ name: result.error.name, message: result.error.message })
            await dialog.alert({
                title: 'Error',
                message: 'An error occurred verifying email, please try again later.',
            })
            router.push('/profile/account')
        }
    }

    const handleSendVerificationCode = async () => {
        const result = await auth.sendAttributeVerificationCode('email')
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
            router.push('/profile/account')
        }
    }

    return (
        <div className="max-w-sm w-full mx-auto p-5">
            <FormTitle title="Confirm Email" />
            <FormNotif notif={notif} />
            <FormError error={error} />
            <VerifyUserForm onSubmit={handleVerifyUser} />
        </div>
    )
}

VerifyEmail.getLayout = function getLayout(page: ReactElement) {
    return (
        <ProtectedRoute>
            <ProfileLayout>{page}</ProfileLayout>
        </ProtectedRoute>
    )
}
