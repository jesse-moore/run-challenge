import { CamelCaseNamingConvention, mapFrom, MappingProfile, mapWith, mapWithArguments } from '@automapper/core'
import { ChallengeDto, ChallengeIntervalDto } from '../../dtos/ChallengeDto'
import { ChallengeFormDto, ChallengeIntervalFormDto } from '../../dtos/ChallengeFormDto'
import { date } from '../../utils'

export const challengeProfile: MappingProfile = (mapper) => {
    mapper.createMap(ChallengeDto, ChallengeFormDto, {})
    mapper.createMap(ChallengeFormDto, ChallengeDto, {}).forMember(
        (destination) => destination.intervals,
        mapFrom((source) => {
            return source.intervals.map((interval) => {
                return mapper.map(interval, ChallengeIntervalDto, ChallengeIntervalFormDto, {
                    extraArguments: { start: source.start, interval: interval.interval },
                })
            })
        })
    )
    mapper
        .createMap(ChallengeIntervalFormDto, ChallengeIntervalDto, {})
        .forMember(
            (destination) => destination.requirements,
            mapFrom((source) => {
                const requirements = {}
                source.requirements.forEach((req) => {
                    requirements[req.metric] = req.value
                })
                return requirements
            })
        )
        .forMember(
            (destination) => destination.start,
            mapWithArguments((source, { start, interval }: { start: string; interval: number }) => {
                return date.addDay(start, interval - 1)
            })
        )
        .forMember(
            (destination) => destination.end,
            mapWithArguments((source, { start, interval }: { start: string; interval: number }) => {
                return date.addDay(start + 'T23:59:59', interval - 1)
            })
        )
    mapper.createMap(ChallengeIntervalDto, ChallengeIntervalFormDto, {})
}
