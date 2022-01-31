import { AutoMap } from '@automapper/classes'
import { ChallengeType, IntervalType, RequirementType, ScoringMetric, Unit } from './ChallengeDto'

export class ChallengeFormDto {
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
    @AutoMap({ typeFn: () => ChallengeIntervalFormDto })
    intervals: ChallengeIntervalFormDto[]
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

export class ChallengeIntervalFormDto {
    @AutoMap()
    interval: number
    @AutoMap()
    scoringMetric: ScoringMetric
    @AutoMap({ typeFn: () => IntervalRequirementFormDto })
    requirements: IntervalRequirementFormDto[]
    constructor(interval: number) {
        this.interval = interval
        this.scoringMetric = ScoringMetric.Pace
        this.requirements = [new IntervalRequirementFormDto()]
    }
}

export class IntervalRequirementFormDto {
    @AutoMap()
    metric: RequirementType
    @AutoMap()
    value: number
    constructor() {
        this.metric = undefined
        this.value = 0
    }
}
