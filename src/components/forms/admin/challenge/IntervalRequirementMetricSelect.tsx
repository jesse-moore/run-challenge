import { useEffect } from 'react'
import { useField } from 'formik'
import { RequirementType } from '../../../../dtos/ChallengeDto'

interface IIntervalRequirementMetricSelect {
    name: string
    options: RequirementType[]
    selectedMetric: RequirementType
}

export const IntervalRequirementMetricSelect = ({
    name,
    options,
    selectedMetric,
}: IIntervalRequirementMetricSelect) => {
    const [field, meta, helpers] = useField(name)

    useEffect(() => {
        if (!selectedMetric) helpers.setValue(options[0])
    }, [])

    return (
        <label>
            <select {...field} className="rounded-md w-32" value={selectedMetric}>
                {options.map((option, i) => (
                    <option value={option} key={`${name}.${option}`}>
                        {option[0].toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </label>
    )
}
