import { Unit } from './ChallengeDto'

export class ActivityDto {
    distance: number
    elapsed_time: number
    elevationGain: number
    moving_time: number
    date: string
    local_date: string
    timezone: string
    offset: number
    constructor() {
        this.distance = 0
        this.elapsed_time = 0
        this.elevationGain = 0
        this.moving_time = 0
        this.date = ''
        this.local_date = ''
        this.timezone = ''
        this.offset = 0
    }
}

export class ActivityManualEntryDto {
    units: Unit
    distance: number
    duration: Duration
    elevationGain: number
    date: string
    time: string
    timezone: string
    offset: number
    constructor() {
        this.distance = 0
        this.duration = { hours: 0, minutes: 0, seconds: 0 }
        this.elevationGain = 0
        this.time = ''
        this.date = ''
        this.timezone = ''
        this.offset = 0
        this.units = Unit.Metric
    }
}

export interface Duration {
    hours: number
    minutes: number
    seconds: number
}
