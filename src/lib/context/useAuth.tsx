import React, { useState, useContext, createContext, ReactNode, useEffect } from 'react'
import * as cognito from '../cognito'

interface IAuthContext {
    user: UserDataInterface | null
    signin: (email: string, password: string) => Promise<cognito.ILoginResult>
    signup: (email: string, password: string, username: string) => Promise<void | { error: string }>
    signout: () => void
    completeNewPasswordChallenge: (password: string) => Promise<any>
    completePasswordReset: (code: string, newPassword: string) => Promise<IAuthError | void>
    forgotPassword: (email: string) => Promise<IAuthError | void>
    isLoaded: boolean
}

interface IAuthError {
    name: string
    message: string
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

    const signin = async (email: string, password: string) => {
        try {
            const result = await cognito.login({ email, password })
            if (result.newPasswordRequired || result.passwordResetRequired) return result
            const user = await cognito.getUser()
            setUser(user)
            return result
        } catch (error) {
            return error
        }
    }
    const signup = async (email: string, password: string, username: string) => {
        try {
            await cognito.signup({ email, password, username })
            const user = await cognito.getUser()
            setUser(user)
        } catch (error) {
            return { error: 'Error signing up, try again later' }
        }
    }
    const signout = () => {
        cognito.logout()
        setUser(null)
    }

    const completeNewPasswordChallenge = async (password: string) => {
        try {
            await cognito.completeNewPasswordChallenge(password)
            const user = await cognito.getUser()
            setUser(user)
        } catch (error) {
            return { error: 'Error signing up, try again later' }
        }
    }

    const completePasswordReset = async (code: string, newPassword: string) => {
        try {
            const user = await cognito.completePasswordReset(code, newPassword)
        } catch (error) {
            return { name: error.name, message: error.message }
        }
    }

    const forgotPassword = async (email: string) => {
        try {
            await cognito.forgotPassord(email)
        } catch (error) {
            return { name: error.name, message: error.message }
        }
    }

    return {
        user,
        isLoaded,
        signin,
        signup,
        signout,
        completeNewPasswordChallenge,
        completePasswordReset,
        forgotPassword,
    }
}
