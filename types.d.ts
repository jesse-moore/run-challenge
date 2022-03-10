declare global {
    var mongoose: {
        conn: typeof mongoose
        promise: Promise<typeof mongoose>
    }
}
interface UserDataInterface {
    birthdate: string
    email: string
    email_verified: string
    gender: string
    groups: string[]
    name: string
    sub: string
    username: string
}
