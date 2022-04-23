import React, { useState } from 'react'
import logger from '../../../api/logger'
import { clientMapper } from '../../../lib/automapper/clientMapper'
import { AuthenticateDialog } from '../../../components/dialogs/AuthenticateDialog'
import { FormError, FormTitle } from '../../../components/forms/common'
import { FormNotif } from '../../../components/forms/common/FormNotif'
import EditProfileForm from '../../../components/forms/user/EditProfileForm'
import { EditProfileFormDto } from '../../../dtos/EditProfileFormDto'
import { useAuth } from '../../../lib/context/useAuth'
import { useDialog } from '../../../lib/context/useDialog'
import { useSpinner } from '../../../lib/context/useSpinner'
import { UserAttributesDto } from '../../../dtos/UserAttributesDto'
import { useRouter } from 'next/router'

const Editprofile = () => {
    const { user, ...auth } = useAuth()
    const dialog = useDialog()
    const spinner = useSpinner()
    const router = useRouter()
    const [notif, setNotif] = useState('')
    const [error, setError] = useState('')

    const onSubmit = async (values: EditProfileFormDto) => {
        const authenticated = auth.checkAuthenticationStatus()
        if (!authenticated) {
            const result = await reauthenticate()
            if (!result) return
        }
        const userAttributes = clientMapper.map(values, UserAttributesDto, EditProfileFormDto)
        spinner.start()
        const result = await auth.updateUserAttributes(userAttributes)
        spinner.stop()
        if (!result) {
            router.push('/profile/account')
        } else if ('error' in result) {
            logger.error({ name: result.error.name, message: result.error.message })
            await dialog.alert({
                title: 'Error',
                message: 'Error occurred updating profile, please try again later.',
            })
            router.push('/profile/account')
        }
    }

    const reauthenticate = async (): Promise<boolean> => {
        return await dialog.custom(<AuthenticateDialog />, {
            title: 'authenticate',
            shouldCloseOnEsc: false,
            shouldCloseOnOverlayClick: false,
        })
    }

    return (
        <div className="max-w-sm w-full mx-auto p-5">
            <FormTitle title="Edit Profile" />
            <FormNotif notif={notif} />
            <FormError error={error} />
            <EditProfileForm onSubmit={onSubmit} initialValues={new EditProfileFormDto(user)} />
        </div>
    )
}

export default Editprofile
