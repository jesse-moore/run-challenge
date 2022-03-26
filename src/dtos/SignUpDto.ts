import { AutoMap } from '@automapper/classes'
import { ISignInValues, IUserAttributes } from '../lib/cognito/types'

export class SignUpDto implements ISignInValues, IUserAttributes {
    @AutoMap()
    username: string
    @AutoMap()
    password: string
    @AutoMap()
    gender: string
    @AutoMap()
    name: string
    @AutoMap()
    birthdate: string

    constructor() {
        this.username = ''
        this.password = ''
        this.gender = ''
        this.name = ''
        this.birthdate = ''
    }
}
