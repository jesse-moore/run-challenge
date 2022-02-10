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

const login = ({ email, password }: { email: string; password: string }) => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        })
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        })

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                resolve(data)
            },

            onFailure: (err) => {
                console.log(err.message)
                reject(err.message)
            },

            newPasswordRequired: (data) => {
                //TODO new password form
                console.log('newPasswordRequired:', data)
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
            getSession(user).then(() => {
                const username = user.getUsername()
                console.log(username)
                user.getUserAttributes((err: Error | undefined, attributes: CognitoUserAttribute[] | undefined) => {
                    if (err) {
                        reject(err)
                    } else {
                        const results: UserDataInterface = {
                            email: '',
                            email_verified: '',
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
                        resolve({ ...results, username })
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

export { UserPool, signup, login, getUser, getSession, logout, getJWT, getUserData }
