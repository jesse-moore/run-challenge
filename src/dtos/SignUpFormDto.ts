import { AutoMap } from '@automapper/classes'

export class SignUpFormDto {
    @AutoMap()
    email: string
    @AutoMap()
    password: string
    confirmPassword: string
    @AutoMap()
    gender: string
    @AutoMap()
    name: string
    @AutoMap({ typeFn: () => YearMonthDayFormDto })
    birthdate: YearMonthDayFormDto

    constructor() {
        this.email = 'moore.jesse@gmail.com'
        this.password = 'Testing01!'
        this.confirmPassword = 'Testing01!'
        this.gender = 'male'
        this.name = ''
        this.birthdate = new YearMonthDayFormDto()
    }
}

class YearMonthDayFormDto {
    @AutoMap()
    year: number
    @AutoMap()
    month: number
    @AutoMap()
    day: number
    constructor() {
        this.year = 1999
        this.month = 4
        this.day = 14
    }
}
