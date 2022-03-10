import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession,
    ISignUpResult,
} from 'amazon-cognito-identity-js'

const UserPoolId = process.env.NEXT_PUBLIC_COGNITO_POOL_ID
const ClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
if (!UserPoolId || !ClientId) throw new Error('Invalid pool data')

const poolData: { UserPoolId: string; ClientId: string } = {
    UserPoolId,
    ClientId,
}

const UserPool = new CognitoUserPool(poolData)

let cognitoUser: CognitoUser

const signup = ({
    email,
    password,
    username,
}: {
    email: string
    password: string
    username: string
}): Promise<ISignUpResult> => {
    const dataEmail = {
        Name: 'email',
        Value: email,
    }
    const attributeEmail = new CognitoUserAttribute(dataEmail)
    return new Promise((resolve, reject) => {
        UserPool.signUp(username, password, [attributeEmail], [], (err, data) => {
            if (err) reject(err.message)
            if (data) {
                resolve(data)
            }
            reject('Unknown Error')
        })
    })
}

export interface ILoginResult {
    user?: CognitoUserSession
    newPasswordRequired?: boolean
    passwordResetRequired?: boolean
    error?: string
}

const login = ({ email, password }: { email: string; password: string }): Promise<ILoginResult> => {
    return new Promise((resolve, reject) => {
        cognitoUser = new CognitoUser({
            Username: email,
            Pool: UserPool,
        })
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        })

        const result: ILoginResult = {}

        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (data) => {
                result.user = data
                resolve(result)
            },

            onFailure: (err) => {
                if (err.code === 'PasswordResetRequiredException') {
                    result.passwordResetRequired = true
                    resolve(result)
                } else {
                    result.error = err.message
                    reject(result)
                }
            },

            newPasswordRequired: (data) => {
                result.user = data
                result.newPasswordRequired = true
                resolve(result)
            },
        })
    })
}

const completePasswordReset = (code: string, newPassword: string) => {
    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(code, newPassword, {
            onSuccess: (data) => {
                resolve(data)
            },

            onFailure: (err) => {
                reject(err)
            },
        })
    })
}

const forgotPassord = (email: string) => {
    cognitoUser = new CognitoUser({
        Username: email,
        Pool: UserPool,
    })
    return new Promise((resolve, reject) => {
        cognitoUser.forgotPassword({
            onSuccess: (data) => {
                resolve(data)
            },

            onFailure: (err) => {
                reject(err)
            },
        })
    })
}

const completeNewPasswordChallenge = (newPassword: string) => {
    return new Promise((resolve, reject) => {
        cognitoUser.completeNewPasswordChallenge(newPassword, null, {
            onSuccess: (data) => {
                resolve(data)
            },
            onFailure: (err) => {
                reject(err)
            },
        })
    })
}

const logout = () => {
    const user = UserPool.getCurrentUser()
    if (user) {
        user.signOut()
    }
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
                console.log(session)
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
}
