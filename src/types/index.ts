import { Mongoose } from 'mongoose'

export type { TypeA } from './package-1'
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
