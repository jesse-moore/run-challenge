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

    constructor(user?: UserDataInterface) {
        this.email = user.email || ''
        this.password = 'aaaaaaa'
        this.confirmPassword = ''
        this.gender = user.gender || ''
        this.name = user.name || ''
        this.birthdate = new YearMonthDayFormDto(user.birthdate)
    }
}

class YearMonthDayFormDto {
    @AutoMap()
    year: number
    @AutoMap()
    month: number
    @AutoMap()
    day: number
    constructor(date?: string) {
        const dateObject = date ? new Date(date) : null
        this.year = dateObject ? dateObject.getFullYear() : null
        this.month = dateObject ? dateObject.getMonth() : null
        this.day = dateObject ? dateObject.getDate() : null
    }
}
