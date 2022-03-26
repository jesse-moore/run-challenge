import { mapFrom, MappingProfile } from '@automapper/core'
import { SignUpDto } from '../../dtos/SignUpDto'
import { SignUpFormDto } from '../../dtos/SignUpFormDto'

export const signUpProfile: MappingProfile = (mapper) => {
    mapper
        .createMap(SignUpFormDto, SignUpDto)
        .forMember(
            (destination) => destination.birthdate,
            mapFrom((source) => {
                const { year, month, day } = source.birthdate
                const monthString = month < 10 ? '0' + month : month
                const dayString = day < 10 ? '0' + day : day
                return `${year}-${monthString}-${dayString}`
            })
        )
        .forMember(
            (destination) => destination.username,
            mapFrom((source) => source.email)
        )
}
