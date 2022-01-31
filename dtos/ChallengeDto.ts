import { AutoMap } from '@automapper/classes'

export class ChallengeDto {
	@AutoMap()
    name: string
	@AutoMap()
    start: string
	@AutoMap()
    end: string
	@AutoMap()
    type: ChallengeType
	@AutoMap()
    intervalType: IntervalType
	@AutoMap({ typeFn: () => ChallengeIntervalDto })
    intervals: ChallengeIntervalDto[]
	@AutoMap()
    numberOfIntervals: number
	@AutoMap()
    units: Unit
    constructor() {
        this.name = ''
        this.end = ''
        this.start = ''
        this.type = ChallengeType.Interval
        this.intervalType = IntervalType.Daily
        this.intervals = []
        this.numberOfIntervals = 0
        this.units = Unit.Metric
    }
}
export class ChallengeIntervalDto {
	@AutoMap()
    start: string
	@AutoMap()
    end: string
	@AutoMap()
    scoringMetric: ScoringMetric
	@AutoMap()
    requirements: { [key in RequirementType]: number }
}

export enum RequirementType {
    Distance = 'distance',
    Duration = 'duration',
    Elevation = 'elevation',
}

export enum ChallengeType {
    Interval = 'interval',
    Single = 'single',
}

export enum IntervalType {
    Daily = 'daily',
    Weekly = 'weekly',
}

export enum ScoringMetric {
    Distance = 'distance',
    Duration = 'duration',
    Elevation = 'elevation',
    Pace = 'pace',
}

export enum Unit {
    Metric = 'metric',
    Imperial = 'imperial',
}

export const UnitsMetric = {
    [ScoringMetric.Distance]: 'km',
    [ScoringMetric.Elevation]: 'm',
}

export const UnitsImperial = {
    [ScoringMetric.Distance]: 'mi',
    [ScoringMetric.Elevation]: 'ft',
}

export const Units = {
    [Unit.Imperial]: UnitsImperial,
    [Unit.Metric]: UnitsMetric,
}
