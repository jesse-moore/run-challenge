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
import APPSETTINGS from '../../constants/APPSETTINGS'
import { useRouter } from 'next/router'

interface IAuthContext {
    signup: (values: ISignInValues & IUserAttributes) => Promise<ISignUpResult | { error: ICongnitoSignUpError }>
    verifyUser: (code: string) => Promise<void | { error: ICognitoVerifySignUpError }>
    user: UserDataInterface | null
    sendVerificationCode: (email?: string) => Promise<void | { error: ICognitoSendVerificationCodeError }>
    signin: (
        email: string,
        password: string,
        keepMeSignedIn?: boolean
    ) => Promise<ILoginResult | { error: ICognitoInitiateAuthError } | void>
    signout: () => Promise<void>
    updateUserAttributes: (attributes: IUserAttributes) => Promise<void | { error: ICognitoVerifySignUpError }>
    completeNewPasswordChallenge: (password: string) => Promise<void | { error: ICognitoChangePasswordError }>
    completePasswordReset: (
        code: string,
        newPassword: string
    ) => Promise<void | { error: ICognitoCompletePasswordResetError }>
    forgotPassword: (email: string) => Promise<CodeDeliveryDetails | { error: ICognitoForgotPasswordError }>
    isLoaded: boolean
    checkAuthenticationStatus: () => boolean
    verifyUserAttribute: (attributeName: string, code: string) => Promise<void | { error: ICognitoVerifySignUpError }>
	sendAttributeVerificationCode: ( attributeName: string ) => Promise<void | { error: ICognitoSendVerificationCodeError }>
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
    const router = useRouter()
    const [user, setUser] = useState<UserDataInterface>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        checkUser()
    }, [children])

    const checkUser = async () => {
        if (user && checkLastActivityTimeOut()) {
            signout()
            router.push('/')
        } else if (user) {
            updateLastActivity()
        } else if (!user && !checkLastActivityTimeOut()) {
            await initUser()
            updateLastActivity()
        }
        if (!isLoaded) setIsLoaded(true)
    }

    const initUser = async () => {
        try {
            const user = await cognito.getUser()
            if (!user) {
                signout()
            } else if (!checkLastActivityTimeOut()) {
                setUser(user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkAuthenticationStatus = () => {
        return cognito.checkAuthenticationStatus()
    }

    const checkLastActivityTimeOut = () => {
        const keepMeSignedIn = localStorage.getItem('keepMeSignedIn')
        if (keepMeSignedIn && Boolean(keepMeSignedIn)) return false
        const lastActivity = localStorage.getItem('lastActivity')
        if (!lastActivity) return true
        return new Date().valueOf() - Number(lastActivity) > APPSETTINGS.LASTACTIVITYTIMEOUT
    }

    const updateLastActivity = () => {
        localStorage.setItem('lastActivity', new Date().valueOf().toString())
    }

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

    const sendAttributeVerificationCode = async (
        attributeName: string
    ): Promise<void | { error: ICognitoSendVerificationCodeError }> => {
        try {
            return await cognito.sendUserAttributeVerification(attributeName)
        } catch (error) {
            return { error: { name: 'InternalErrorException', message: error.message } }
        }
    }

    const signin = async (
        email: string,
        password: string,
        keepMeSignedIn: boolean
    ): Promise<ILoginResult | { error: ICognitoInitiateAuthError } | void> => {
        try {
            const result = await cognito.login({ username: email, password })
            if ('error' in result || 'newPasswordRequired' in result) {
                return result
            } else {
                const user = await cognito.getUser()
                setUser(user)
                updateLastActivity()
                if (keepMeSignedIn) {
                    localStorage.setItem('keepMeSignedIn', 'true')
                }
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
        localStorage.removeItem('lastActivity')
        localStorage.removeItem('keepMeSignedIn')
    }

    const updateUserAttributes = async (
        attributes: IUserAttributes
    ): Promise<void | { error: ICognitoVerifySignUpError }> => {
        try {
            const result = await cognito.updateUserAttributes(attributes)
            if (!result) {
                const user = await cognito.getUser()
                setUser(user)
            }
            return result
        } catch (error) {
            return { error: { name: 'InternalErrorException', message: '' } }
        }
    }

    const verifyUserAttribute = async (
        attributeName: string,
        code: string
    ): Promise<void | { error: ICognitoVerifySignUpError }> => {
        try {
            const result = await cognito.verifyUserAttribute(attributeName, code)
            if (!result) {
                const user = await cognito.getUser()
                setUser(user)
            }
            return result
        } catch (error) {
            return { error: { name: 'InternalErrorException', message: '' } }
        }
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
        updateUserAttributes,
        checkAuthenticationStatus,
        verifyUserAttribute,
		sendAttributeVerificationCode
    }
}
