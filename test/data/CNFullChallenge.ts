import { ChallengeType, IntervalType, RequirementType, ScoringMetric, Unit } from '../../src/dtos/ChallengeDto'
import { ChallengeFormDto, ChallengeIntervalFormDto, IntervalRequirementFormDto } from '../../src/dtos/ChallengeFormDto'

const form = new ChallengeFormDto()

form.name = 'Test Challenge'
form.start = '2022-03-01'
form.end = '2022-03-14'
form.type = ChallengeType.Interval
form.intervalType = IntervalType.Daily
form.units = Unit.Metric

let distance = 0
const intervals = [...Array(14)].map((_, i) => {
    if (i < 7) {
        distance += 5
    } else if (i > 7) {
        distance -= 5
    }
    const day = new ChallengeIntervalFormDto(i + 1)
    const dayRequirement = new IntervalRequirementFormDto()
    dayRequirement.metric = RequirementType.Distance
    dayRequirement.value = distance
    day.requirements = [dayRequirement]
    day.scoringMetric = ScoringMetric.Pace
    return day
})

form.intervals = intervals

export default form
