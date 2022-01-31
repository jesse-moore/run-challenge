import { CamelCaseNamingConvention, mapFrom, MappingProfile } from '@automapper/core'
import { ChallengeDto, ChallengeIntervalDto } from '../../dtos/ChallengeDto'
import { ChallengeFormDto, ChallengeIntervalFormDto } from '../../dtos/ChallengeFormDto'

export const challengeProfile: MappingProfile = (mapper) => {
    mapper.createMap(ChallengeDto, ChallengeFormDto, {
        namingConventions: {
            source: new CamelCaseNamingConvention(),
            destination: new CamelCaseNamingConvention(),
        },
    })
    mapper.createMap(ChallengeFormDto, ChallengeDto, {
        namingConventions: {
            source: new CamelCaseNamingConvention(),
            destination: new CamelCaseNamingConvention(),
        },
    })
    mapper
        .createMap(ChallengeIntervalFormDto, ChallengeIntervalDto, {
            namingConventions: {
                source: new CamelCaseNamingConvention(),
                destination: new CamelCaseNamingConvention(),
            },
        })
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
    mapper.createMap(ChallengeIntervalDto, ChallengeIntervalFormDto, {
        namingConventions: {
            source: new CamelCaseNamingConvention(),
            destination: new CamelCaseNamingConvention(),
        },
    })
}
