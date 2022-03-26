import { CodeDeliveryDetails, ISignUpResult } from 'amazon-cognito-identity-js'
import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react'
import * as cognito from '../cognito'
import {
    ICognitoChangePasswordError,
    ICognitoCompletePasswordResetError,
    ICognitoForgotPasswordError,
    ICognitoInitiateAuthError,
    ICognitoSendVerificationCodeError,
    ICognitoVerifySignUpError,
    ICongnitoSignUpError,
    ILoginResult,
    ISignInValues,
    IUserAttributes,
} from '../cognito/types'

interface IAuthContext {
    signup: (values: ISignInValues & IUserAttributes) => Promise<ISignUpResult | { error: ICongnitoSignUpError }>
    verifyUser: (code: string) => Promise<void | { error: ICognitoVerifySignUpError }>
    user: UserDataInterface | null
    sendVerificationCode: (
        email?: string
    ) => Promise<void | { error: ICognitoSendVerificationCodeError }>
    signin: (email: string, password: string) => Promise<ILoginResult | { error: ICognitoInitiateAuthError } | void>
    signout: () => Promise<void>
    completeNewPasswordChallenge: (password: string) => Promise<void | { error: ICognitoChangePasswordError }>
    completePasswordReset: (
        code: string,
        newPassword: string
    ) => Promise<void | { error: ICognitoCompletePasswordResetError }>
    forgotPassword: (email: string) => Promise<CodeDeliveryDetails | { error: ICognitoForgotPasswordError }>
    isLoaded: boolean
}

const AuthContext = createContext<IAuthContext>(undefined)

export function ProvideAuth({ children }: { children: ReactNode }) {
    const auth = useProvideAuth(children)
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be within AuthProvider')
    }
    return context
}

function useProvideAuth(children: React.ReactNode) {
    const [user, setUser] = useState<UserDataInterface>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    useEffect(() => {
        const initUser = async () => {
            try {
                const user = await cognito.getUser()
                if (!user) {
                    signout()
                } else {
                    console.log(user)
                    setUser(user)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (!user) initUser()
    }, [children])

    const completeNewPasswordChallenge = async (
        password: string
    ): Promise<void | { error: ICognitoChangePasswordError }> => {
        try {
            const result = await cognito.completeNewPasswordChallenge(password)
            if (!result) {
                const user = await cognito.getUser()
                setUser(user)
            } else {
                return result
            }
        } catch (error) {
            return { error: { name: 'InternalErrorException', message: '' } }
        }
    }

    const completePasswordReset = async (
        code: string,
        newPassword: string
    ): Promise<void | { error: ICognitoCompletePasswordResetError }> => {
        try {
            return await cognito.completePasswordReset(code, newPassword)
        } catch (error) {
            return { error: { name: 'InternalErrorException', message: '' } }
        }
    }

    const forgotPassword = async (
        email: string
    ): Promise<CodeDeliveryDetails | { error: ICognitoForgotPasswordError }> => {
        try {
            return await cognito.forgotPassord(email)
        } catch (error) {
            return { error: { name: 'InternalErrorException', message: '' } }
        }
    }

    const sendVerificationCode = async (
        email?: string
    ): Promise<void | { error: ICognitoSendVerificationCodeError }> => {
        try {
            return await cognito.sendVerificationCode(email)
        } catch (error) {
            return { error: { name: 'InternalErrorException', message: error.message } }
        }
    }

    const signin = async (
        email: string,
        password: string
    ): Promise<ILoginResult | { error: ICognitoInitiateAuthError } | void> => {
        try {
            const result = await cognito.login({ username: email, password })
            if ('error' in result || 'newPasswordRequired' in result) {
                return result
            } else {
                const user = await cognito.getUser()
                setUser(user)
            }
        } catch (error) {
            return { error: { name: 'InternalErrorException', message: '' } }
        }
    }
    const signup = async (
        values: ISignInValues & IUserAttributes
    ): Promise<ISignUpResult | { error: ICongnitoSignUpError }> => {
        try {
            const result = await cognito.signup(values)
            if ('user' in result) {
                const user = await cognito.getUser()
                setUser(user)
            }
            return result
        } catch (error) {
            return { error: { name: 'InternalErrorException', message: '' } }
        }
    }
    const signout = async (): Promise<void> => {
        await cognito.logout()
        setUser(null)
    }

    const verifyUser = async (
        code: string
    ): Promise<void | {
        error: ICognitoVerifySignUpError
    }> => {
        try {
            const result = await cognito.verifyUser(code)
            if (!result) {
                const user = await cognito.getUser()
                setUser(user)
            } else {
                return result
            }
        } catch (error) {
            return { error: { name: 'InternalErrorException', message: '' } }
        }
    }

    return {
        user,
        isLoaded,
        sendVerificationCode,
        signin,
        signup,
        signout,
        completeNewPasswordChallenge,
        completePasswordReset,
        forgotPassword,
        verifyUser,
    }
}
