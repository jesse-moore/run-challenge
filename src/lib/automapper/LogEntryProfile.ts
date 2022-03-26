import { fromValue, mapFrom, MappingProfile } from '@automapper/core'
import { Entry, Severity } from '@google-cloud/logging'
import { LogEntry } from '@google-cloud/logging/build/src/entry'
import { LogEntryDto } from '../../dtos/LogEntryDto'

export const logEntryProfile: MappingProfile = (mapper) => {
    mapper
        .createMap(LogEntryDto, Entry, {})
        .forMember(
            (destination) => destination.metadata.labels,
            mapFrom((source) => source.labels)
        )
        .forMember((destination) => destination.metadata.resource, fromValue({ type: 'global' }))
        .forMember(
            (destination) => destination.metadata.severity,
            mapFrom((source) => source.severity)
        )
        .forMember(
            (destination) => destination.data,
            mapFrom((source) => {
                return source.text
            })
        )
}
