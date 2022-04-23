import { AutoMap } from '@automapper/classes'

export class EditProfileFormDto {
    @AutoMap()
    gender: string
    @AutoMap()
    name: string
    @AutoMap()
    birthdate: YearMonthDayFormDto

    constructor(user?: UserDataInterface) {
        this.gender = user ? user.gender : ''
        this.name = user ? user.name : ''
        this.birthdate = user ? new YearMonthDayFormDto(user.birthdate) : new YearMonthDayFormDto()
    }

    equals = (values: EditProfileFormDto) => {
        return (
            values.name === this.name &&
            values.gender === this.gender &&
            Number(values.birthdate.day) === this.birthdate.day &&
            Number(values.birthdate.month) === this.birthdate.month &&
            Number(values.birthdate.year) === this.birthdate.year
        )
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
