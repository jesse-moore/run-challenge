import { useFormikContext } from 'formik'
import { Delete } from '../../../icons'
import { RequirementType, Unit, UnitsImperial, UnitsMetric } from '../../../../dtos/ChallengeDto'
import { IntervalRequirementMetricSelect } from './IntervalRequirementMetricSelect'
import { IntervalRequirementDurationInput } from './IntervalRequirementDurationInput'
import { IntervalRequirementNumberInput } from './IntervalRequirementNumberInput'
import { ChallengeFormDto, IntervalRequirementFormDto } from '../../../../dtos/ChallengeFormDto'

interface IIntervalRequirementForm {
    requirement: IntervalRequirementFormDto
    index: number
    intervalIndex: number
    options: RequirementType[]
    onDelete: () => void
}

export const IntervalRequirementForm = ({
    index,
    intervalIndex,
    requirement,
    options,
    onDelete,
}: IIntervalRequirementForm) => {
    const { values } = useFormikContext<ChallengeFormDto>()
    const { metric } = requirement
    let _options = metric ? [metric, ...options] : options
    const name = `intervals.${intervalIndex}.requirements.${index}.value`
    return (
        <div className="flex flex-row items-end gap-2 bg-gray-200 rounded p-2">
            <span>Requirement:</span>
            <IntervalRequirementMetricSelect
                name={`intervals.${intervalIndex}.requirements.${index}.metric`}
                options={_options}
                selectedMetric={metric}
            />
            <span>at least</span>
            <label />
            {metric === RequirementType.Duration ? (
                <IntervalRequirementDurationInput name={name} />
            ) : (
                <IntervalRequirementNumberInput
                    name={name}
                    unit={values.units === Unit.Imperial ? UnitsImperial[metric] : UnitsMetric[metric]}
                />
            )}

            <button type="button" className="self-center ml-auto" onClick={onDelete}>
                <Delete />
            </button>
        </div>
    )
}
