import React from 'react'
import PasswordResetForm from '../components/forms/user/PasswordResetForm'
import { useAuth } from '../lib/context/useAuth'

const Forgotpassword = () => {
    const auth = useAuth()

    const handlePasswordReset = async () => {

    }

    return (
        <div className="mx-auto w-full">
            <PasswordResetForm onSubmit={handlePasswordReset} />
        </div>
    )
}

export default Forgotpassword
