declare global {
    var mongoose: {
        conn: typeof mongoose
        promise: Promise<typeof mongoose>
    }
}
interface UserDataInterface {
    email: string;
    email_verified: string;
    sub: string;
    username: string;
}