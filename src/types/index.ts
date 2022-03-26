import { Mongoose } from 'mongoose'

declare global {
    namespace NodeJS {
        interface Global {
            mongoose: {
                conn: typeof import('mongoose')
                promise: Promise<Mongoose>
            }
        }
    }
}
