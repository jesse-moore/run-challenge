import { useField, FieldArray } from 'formik'
import { RequirementType, ScoringMetric } from '../../../../dtos/ChallengeDto'
import { ChallengeIntervalFormDto, IntervalRequirementFormDto } from '../../../../dtos/ChallengeFormDto'
import { IntervalRequirementForm } from './IntervalRequirementForm'

interface ICustomIntervalEntryForm {
    date: string
    interval: ChallengeIntervalFormDto
    index: number
}

export const CustomIntervalEntryForm = ({ date, interval, index }: ICustomIntervalEntryForm) => {
    const [field] = useField<ScoringMetric>(`intervals.${index}.scoringMetric`)

    return (
        <div className="bg-gray-100 flex flex-col gap-4 p-4 rounded-md shadow">
            <span className="text-lg font-medium">{date}</span>
            <label className="block">
                <span className="mr-2">Scoring Metric : </span>
                <select className="rounded-md" {...field}>
                    {Object.entries(ScoringMetric).map(([metric, name]) => (
                        <option value={name} key={`${field.name}.${name}`}>
                            {metric}
                        </option>
                    ))}
                </select>
            </label>
            <FieldArray
                name={`intervals.${index}.requirements`}
                render={(arrayHelpers) => {
                    let options = Object.values(RequirementType)
                    let usedOptions = interval.requirements.map((req) => req.metric)
                    options = options.filter((option) => !usedOptions.includes(option))
                    return (
                        <>
                            {interval.requirements.map((req, i) => {
                                return (
                                    <IntervalRequirementForm
                                        requirement={req}
                                        index={i}
                                        intervalIndex={index}
                                        options={options}
                                        onDelete={() => arrayHelpers.remove(i)}
                                        key={`intervals.${index}.requirements.${req.metric}`}
                                    />
                                )
                            })}
                            {options.length > 0 && (
                                <button
                                    className="
										mx-auto
										w-fit
										rounded-md
										bg-indigo-600
										border
										border-primary
										py-3
										px-5
										bg-primary
										text-base text-white
										cursor-pointer
										hover:bg-opacity-90
										transition
									"
                                    type="button"
                                    onClick={() => arrayHelpers.push(new IntervalRequirementFormDto())}
                                >
                                    Add Requirement
                                </button>
                            )}
                        </>
                    )
                }}
            />
        </div>
    )
}
