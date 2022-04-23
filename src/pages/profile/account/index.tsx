import Link from 'next/link'
import React, { ReactElement } from 'react'
import { Button } from '../../../components/common/Button'
import { ProtectedRoute } from '../../../components/common/ProtectedRoute'
import ProfileLayout from '../../../components/profile/profileLayout'
import { useAuth } from '../../../lib/context/useAuth'

export default function Account() {
    const { user, ...auth } = useAuth()

    const confirmEmail = (): void => {
        console.log(user)
    }

    return (
        <div className="max-w-sm w-full flex flex-col mx-auto p-5 gap-y-4">
            {user.email_verified === 'false' && (
                <Link href="account/confirmemail">
                    <a>
                        <Button title="Confirm Email" warning />
                    </a>
                </Link>
            )}
            <Link href="account/editprofile">
                <a>
                    <Button title="Edit Profile" />
                </a>
            </Link>
            <Link href="account/changeemail">
                <a>
                    <Button title="Change Email" />
                </a>
            </Link>
            <Link href="account/changepassword">
                <a>
                    <Button title="Change Password" />
                </a>
            </Link>
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
