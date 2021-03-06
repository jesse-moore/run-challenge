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
        this.email = user ? user.email : ''
        this.password = 'aaaaaaa'
        this.confirmPassword = ''
        this.gender = user ? user.gender : ''
        this.name = user ? user.name : ''
        this.birthdate = user ? new YearMonthDayFormDto(user.birthdate) : new YearMonthDayFormDto()
    }
}

class YearMonthDayFormDto {
    @AutoMap()
    year: number | string
    @AutoMap()
    month: number | string
    @AutoMap()
    day: number | string
    constructor(date: string = '') {
        const [year, month, day] = date.split('-')
        this.year = Number(year) || ''
        this.month = Number(month) || ''
        this.day = Number(day) || ''
    }
}
