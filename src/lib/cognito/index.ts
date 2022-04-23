import {
    AuthenticationDetails,
    CodeDeliveryDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession,
    ICognitoUserAttributeData,
    ISignUpResult,
} from 'amazon-cognito-identity-js'
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
} from './types'

const UserPoolId = process.env.NEXT_PUBLIC_COGNITO_POOL_ID
const ClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
if (!UserPoolId || !ClientId) throw new Error('Invalid pool data')

const poolData: { UserPoolId: string; ClientId: string } = {
    UserPoolId,
    ClientId,
}

const UserPool = new CognitoUserPool(poolData)

let cognitoUser: CognitoUser = null

const completeNewPasswordChallenge = (newPassword: string): Promise<void | { error: ICognitoChangePasswordError }> => {
    return new Promise((resolve, _reject) => {
        cognitoUser.completeNewPasswordChallenge(newPassword, null, {
            onSuccess: () => {
                resolve()
            },

            onFailure: (err) => {
                resolve({ error: { name: err.name as ICognitoChangePasswordError['name'], message: err.message } })
            },

            newPasswordRequired: () => {
                throw new Error('Callback not implemented yet')
            },
            mfaRequired: (challengeName: any, challengeParameters: any) => {
                throw new Error('Callback not implemented yet')
            },
            totpRequired: (challengeName: any, challengeParameters: any) => {
                throw new Error('Callback not implemented yet')
            },
            customChallenge: (challengeParameters: any) => {
                throw new Error('Callback not implemented yet')
            },
            mfaSetup: (challengeName: any, challengeParameters: any) => {
                throw new Error('Callback not implemented yet')
            },
            selectMFAType: (challengeName: any, challengeParameters: any) => {
                throw new Error('Callback not implemented yet')
            },
        })
    })
}

const completePasswordReset = (
    code: string,
    newPassword: string
): Promise<void | { error: ICognitoCompletePasswordResetError }> => {
    return new Promise((resolve, _reject) => {
        cognitoUser.confirmPassword(code, newPassword, {
            onSuccess: () => {
                resolve()
            },

            onFailure: (err) => {
                resolve({
                    error: { name: err.name as ICognitoCompletePasswordResetError['name'], message: err.message },
                })
            },
        })
    })
}

const forgotPassord = (email: string): Promise<CodeDeliveryDetails | { error: ICognitoForgotPasswordError }> => {
    cognitoUser = new CognitoUser({
        Username: email,
        Pool: UserPool,
    })
    return new Promise((resolve, _reject) => {
        cognitoUser.forgotPassword({
            onSuccess: (data: CodeDeliveryDetails) => {
                resolve(data)
            },

            onFailure: (err) => {
                resolve({ error: { name: err.name as ICognitoForgotPasswordError['name'], message: err.message } })
            },
        })
    })
}

const login = ({ username, password }: ISignInValues): Promise<ILoginResult | { error: ICognitoInitiateAuthError }> => {
    return new Promise((resolve, _reject) => {
        cognitoUser = new CognitoUser({
            Username: username,
            Pool: UserPool,
        })
        const authDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        })

        const result: ILoginResult = {}

        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (_user, userConfirmationNecessary) => {
                if (userConfirmationNecessary) {
                    // TODO
                }
                resolve(result)
            },

            onFailure: (err) => {
                resolve({ error: { name: err.name as ICognitoInitiateAuthError['name'], message: err.message } })
            },

            newPasswordRequired: (data) => {
                resolve({ newPasswordRequired: true })
            },
            mfaRequired: (challengeName: any, challengeParameters: any) => {
                throw new Error('Callback not implemented yet')
            },
            totpRequired: (challengeName: any, challengeParameters: any) => {
                throw new Error('Callback not implemented yet')
            },
            customChallenge: (challengeParameters: any) => {
                throw new Error('Callback not implemented yet')
            },
            mfaSetup: (challengeName: any, challengeParameters: any) => {
                throw new Error('Callback not implemented yet')
            },
            selectMFAType: (challengeName: any, challengeParameters: any) => {
                throw new Error('Callback not implemented yet')
            },
        })
    })
}

const logout = (): Promise<void> => {
    return new Promise((resolve, _reject) => {
        const user = UserPool.getCurrentUser()
        if (!user) resolve()
        user.signOut(() => {
            resolve()
        })
    })
}

const sendVerificationCode = (email?: string): Promise<void | { error: ICognitoSendVerificationCodeError }> => {
    if (!cognitoUser && !email) throw new Error('No cognito user or email provided')
    if (!cognitoUser) {
        cognitoUser = new CognitoUser({
            Username: email,
            Pool: UserPool,
        })
    }
    return new Promise((resolve, _reject) => {
        cognitoUser.resendConfirmationCode((err, data) => {
            if (err) {
                resolve({
                    error: { name: err.name as ICognitoSendVerificationCodeError['name'], message: err.message },
                })
            } else {
                resolve()
            }
        })
    })
}

const signup = ({
    password,
    username,
    ...attributes
}: ISignInValues & IUserAttributes): Promise<ISignUpResult | { error: ICongnitoSignUpError }> => {
    const userAttributes = Object.entries(attributes).map(([attribute, value]) => {
        return new CognitoUserAttribute({
            Name: attribute,
            Value: value,
        })
    })
    return new Promise((resolve, _reject) => {
        UserPool.signUp(username, password, userAttributes, [], (err, data) => {
            if (err) {
                resolve({
                    error: { name: err.name as ICongnitoSignUpError['name'], message: err.message },
                })
            } else if (data) {
                cognitoUser = data.user
                resolve(data)
            }
        })
    })
}

const verifyUser = (code: string): Promise<void | { error: ICognitoVerifySignUpError }> => {
    return new Promise((resolve, _reject) => {
        cognitoUser.confirmRegistration(code, false, (err) => {
            if (err) {
                resolve({ error: { name: err.name as ICognitoVerifySignUpError['name'], message: err.message } })
            } else {
                resolve()
            }
        })
    })
}

const getSession = async (user: CognitoUser): Promise<CognitoUserSession | null> => {
    return new Promise((resolve, reject) => {
        if (user) {
            user.getSession(async (err: Error, session: CognitoUserSession | null) => {
                if (err) reject(err)
                resolve(session)
            })
        } else reject(null)
    })
}

const getUserData = async (user: CognitoUser): Promise<UserDataInterface | null> => {
    return new Promise((resolve, reject) => {
        if (user) {
            getSession(user).then((session) => {
                const username = user.getUsername()
                user.getUserAttributes((err: Error | undefined, attributes: CognitoUserAttribute[] | undefined) => {
                    if (err) {
                        reject(err)
                    } else {
                        const results: UserDataInterface = {
                            birthdate: '',
                            email: '',
                            email_verified: '',
                            gender: '',
                            groups: [],
                            name: '',
                            sub: '',
                            username: '',
                        }
                        if (attributes) {
                            for (let attribute of attributes) {
                                const { Name, Value } = attribute
                                Object.defineProperty(results, Name, {
                                    value: Value,
                                })
                            }
                        }
                        const groups = session.getIdToken().payload['cognito:groups']
                        resolve({ ...results, groups, username })
                    }
                })
            })
        } else reject(null)
    })
}

const updateUserAttributes = async (
    attributes: IUserAttributes
): Promise<void | { error: ICognitoVerifySignUpError }> => {
    const userAttributes = Object.entries(attributes).map(([attribute, value]) => {
        return new CognitoUserAttribute({
            Name: attribute,
            Value: value,
        })
    })
    return new Promise((resolve, _reject) => {
        cognitoUser.updateAttributes(userAttributes, (err, data) => {
            if (err) {
                resolve({
                    error: { name: err.name as ICognitoVerifySignUpError['name'], message: err.message },
                })
            } else if (data) {
                resolve()
            }
        })
    })
}

const verifyUserAttribute = async (
    attributeName: string,
    code: string
): Promise<void | { error: ICognitoVerifySignUpError }> => {
    return new Promise((resolve, _reject) => {
        cognitoUser.verifyAttribute(attributeName, code, {
            onSuccess: () => {
                resolve()
            },

            onFailure: (err) => {
                resolve({ error: { name: err.name as ICognitoVerifySignUpError['name'], message: err.message } })
            },
        })
    })
}

const sendUserAttributeVerification = async (
    attributeName: string
): Promise<void | { error: ICognitoSendVerificationCodeError }> => {
    return new Promise((resolve, _reject) => {
        cognitoUser.getAttributeVerificationCode(attributeName, {
            onSuccess: () => {
                resolve()
            },

            onFailure: (err) => {
                resolve({
                    error: { name: err.name as ICognitoSendVerificationCodeError['name'], message: err.message },
                })
            },
        })
    })
}

const checkAuthenticationStatus = (): boolean => {
    return cognitoUser !== null
}

const getUser = async (): Promise<UserDataInterface | null> => {
    const user = UserPool.getCurrentUser()
    if (user) {
        try {
            return await getUserData(user)
        } catch (error) {
            return null
        }
    }
    return null
}

const getJWT = async (): Promise<string | null> => {
    const user = UserPool.getCurrentUser()
    if (user) {
        const userSession = await getSession(user)
        const idToken = userSession?.getIdToken()
        const jwtToken = idToken?.getJwtToken()
        if (idToken && jwtToken) return jwtToken
    }
    return null
}

export {
    UserPool,
    signup,
    login,
    getUser,
    getSession,
    logout,
    getJWT,
    getUserData,
    completeNewPasswordChallenge,
    completePasswordReset,
    forgotPassord,
    sendVerificationCode,
    verifyUser,
    updateUserAttributes,
    checkAuthenticationStatus,
    verifyUserAttribute,
    sendUserAttributeVerification,
}
