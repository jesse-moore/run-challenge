import React, { ReactElement, useState } from 'react'
import { ProtectedRoute } from '../../components/common/ProtectedRoute'
import { FormError, FormTitle } from '../../components/forms/common'
import { FormNotif } from '../../components/forms/common/FormNotif'
import ChangeEmailForm from '../../components/forms/user/ChangeEmailForm'
import SettingsForm from '../../components/forms/user/SettingsForm'
import ProfileLayout from '../../components/profile/profileLayout'

export default function Account() {
    const [error, setError] = useState('')
    const [notif, setNotif] = useState('')
    const [stage, setStage] = useState(0)

    const handleSave = (values: any) => {
        console.log(values)
    }

    const handleChangeEmail = (email: string) => {
        console.log(email)
    }

    return (
        <div className="mx-auto w-full">
            <div className="max-w-sm flex flex-col mx-auto p-5">
                {stage === 0 && <AccountMenu onClick={setStage} />}
                {stage === 1 && <div>Edit Profile</div>}
                {stage === 2 && <ChangeEmailForm onSubmit={handleChangeEmail} onBack={() => setStage(0)} />}
                {stage === 3 && <div>Change Password</div>}
            </div>
        </div>
    )
}

// {/* <FormTitle title="User Settings" /> */}
// {error && <FormError error={error} />}
// {notif && <FormNotif notif={notif} />}
// <SettingsForm onSubmit={handleSave} />

const AccountMenu = ({ onClick }: { onClick: (stage: number) => void }) => {
    return (
        <div className="flex flex-col gap-y-4">
            <button
                className="w-full rounded-md text-md font-medium bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                type="button"
                onClick={() => onClick(1)}
            >
                Edit Profile
            </button>
            <button
                className="w-full rounded-md text-md font-medium bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                type="button"
                onClick={() => onClick(2)}
            >
                Change Email
            </button>
            <button
                className="w-full rounded-md text-md font-medium bg-sky-700 border border-primary py-3 px-5 bg-primary text-base text-white cursor-pointer hover:bg-opacity-90"
                type="button"
                onClick={() => onClick(3)}
            >
                Change Password
            </button>
        </div>
    )
}

Account.getLayout = function getLayout(page: ReactElement) {
    return (
        <ProtectedRoute>
            <ProfileLayout>{page}</ProfileLayout>
        </ProtectedRoute>
    )
}
