import { mapFrom, MappingProfile, mapWithArguments } from '@automapper/core'
import { ChallengeDto, ChallengeIntervalDto, RequirementType, Unit } from '../../dtos/ChallengeDto'
import { ChallengeFormDto, ChallengeIntervalFormDto, IntervalRequirementFormDto } from '../../dtos/ChallengeFormDto'
import { date } from '../../utils'

export const challengeProfile: MappingProfile = (mapper) => {
    mapper.createMap(ChallengeFormDto, ChallengeDto, {}).forMember(
        (destination) => destination.intervals,
        mapFrom((source) => {
            return source.intervals.map((interval) => {
                return mapper.map(interval, ChallengeIntervalDto, ChallengeIntervalFormDto, {
                    extraArguments: { start: source.start, interval: interval.interval, unit: source.units },
                })
            })
        })
    )
    mapper
        .createMap(ChallengeIntervalFormDto, ChallengeIntervalDto, {})
        .forMember(
            (destination) => destination.requirements,
            mapFrom((source: ChallengeIntervalFormDto) => {
                const requirements = {}
                source.requirements.forEach(({ metric, value }) => {
                    requirements[metric] = value
                })
                return requirements
            })
        )
        .forMember(
            (destination) => destination.start,
            mapWithArguments((_source, { start, interval }: { start: string; interval: number }) => {
                return date.addDay(start, interval - 1)
            })
        )
        .forMember(
            (destination) => destination.end,
            mapWithArguments((_source, { start, interval }: { start: string; interval: number }) => {
                return date.addDay(start + 'T23:59:59', interval - 1)
            })
        )
    mapper.createMap(ChallengeDto, ChallengeFormDto, {}).forMember(
        (destination) => destination.intervals,
        mapFrom((source) => {
            return source.intervals
                .sort((a, b) => (a.start > b.start ? 1 : -1))
                .map((interval, index) => {
                    return mapper.map(interval, ChallengeIntervalFormDto, ChallengeIntervalDto, {
                        extraArguments: { interval: index },
                    })
                })
        })
    )
    mapper
        .createMap(ChallengeIntervalDto, ChallengeIntervalFormDto, {})
        .forMember(
            (destination) => destination.requirements,
            mapFrom((source: ChallengeIntervalDto) => {
                const requirements = Object.entries(source.requirements).map(
                    ([metric, value]: [RequirementType, number]) => {
                        const requirement = new IntervalRequirementFormDto()
                        requirement.metric = metric
                        requirement.value = value
                        return requirement
                    }
                )
                return requirements
            })
        )
        .forMember(
            (destination) => destination.interval,
            mapWithArguments((_source, { interval }: { interval: number }) => interval)
        )
}
