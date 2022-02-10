import { AutoMap } from '@automapper/classes'
import { Unit } from './ChallengeDto'

export class ActivityDto {
    @AutoMap()
    distance: number
    @AutoMap()
    elapsedTime: number
    @AutoMap()
    elevationGain: number
    @AutoMap()
    movingTime: number
    @AutoMap()
    date: string
    @AutoMap()
    localDate: string
    @AutoMap()
    timezone: string
    @AutoMap()
    offset: number
    constructor() {
        this.distance = 0
        this.elapsedTime = 0
        this.elevationGain = 0
        this.movingTime = 0
        this.date = ''
        this.localDate = ''
        this.timezone = ''
        this.offset = 0
    }
}

export class ActivityFormDto {
    @AutoMap()
    units: Unit
    @AutoMap()
    distance: number
    @AutoMap()
    duration: number
    @AutoMap()
    elevationGain: number
    @AutoMap()
    date: string
    @AutoMap()
    time: string
    @AutoMap()
    timezone: string
    constructor() {
        this.distance = 0
        this.duration = 0
        this.elevationGain = 0
        this.time = ''
        this.date = ''
        this.timezone = ''
        this.units = Unit.Metric
    }
}

export interface Duration {
    hours: number
    minutes: number
    seconds: number
}
