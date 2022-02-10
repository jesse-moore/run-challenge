import { mapFrom, MappingProfile } from '@automapper/core'
import dayjs from 'dayjs'
import _timezone from 'dayjs/plugin/timezone'
dayjs.extend(_timezone)
import timezones from '../../utils/timezones.json'
import { ActivityDto, ActivityFormDto } from '../../dtos/ActivityDto'
import { Unit } from '../../dtos/ChallengeDto'
import { convert } from '../../utils'

export const activityProfile: MappingProfile = (mapper) => {
    mapper
        .createMap(ActivityFormDto, ActivityDto, {})
        .forMember(
            (destination) => destination.elapsedTime,
            mapFrom(({ duration }) => duration)
        )
        .forMember(
            (destination) => destination.movingTime,
            mapFrom(({ duration }) => duration)
        )
        .forMember(
            (destination) => destination.date,
            mapFrom(({ date, time }) => {
                return dayjs(`${date}T${time}`).toISOString()
            })
        )
        .forMember(
            (destination) => destination.localDate,
            mapFrom(({ date, time }) => {
                return `${date}T${time}:00`
            })
        )
        .forMember(
            (destination) => destination.offset,
            mapFrom(({ timezone }) => {
                return timezones[timezone]
            })
        )
    mapper
        .createMap(ActivityDto, ActivityFormDto, {})
        .forMember(
            (destination) => destination.duration,
            mapFrom(({ elapsedTime }) => elapsedTime)
        )
        .forMember(
            (destination) => destination.date,
            mapFrom(({ localDate }) => {
                return dayjs(localDate).format('YYYY-MM-DD')
            })
        )
        .forMember(
            (destination) => destination.time,
            mapFrom(({ localDate }) => {
                return dayjs(localDate).format('HH:mm:ss')
            })
        )
}
