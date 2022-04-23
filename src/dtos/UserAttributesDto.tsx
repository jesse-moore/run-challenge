import { AutoMap } from '@automapper/classes'

export class UserAttributesDto {
    @AutoMap()
    gender: string
    @AutoMap()
    name: string
    @AutoMap()
    birthdate: string

    constructor() {
        this.gender = ''
        this.name = ''
        this.birthdate = ''
    }
}
