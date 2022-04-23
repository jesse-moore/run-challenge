import { mapFrom, MappingProfile } from '@automapper/core'
import { EditProfileFormDto } from '../../dtos/EditProfileFormDto'
import { SignUpDto } from '../../dtos/SignUpDto'
import { SignUpFormDto } from '../../dtos/SignUpFormDto'
import { UserAttributesDto } from '../../dtos/UserAttributesDto'

export const userAttributesProfile: MappingProfile = (mapper) => {
    mapper.createMap(EditProfileFormDto, UserAttributesDto).forMember(
        (destination) => destination.birthdate,
        mapFrom((source) => {
            const { year, month, day } = source.birthdate
            const monthString = month < 10 ? '0' + month : month
            const dayString = day < 10 ? '0' + day : day
            return `${year}-${monthString}-${dayString}`
        })
    )
}
