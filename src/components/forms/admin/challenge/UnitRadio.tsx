import { useField, Field } from 'formik'
import { Unit } from '../../../../dtos/ChallengeDto'

export const UnitRadio = () => {
    const [field] = useField<Unit>('units')
    const baseClass =
        'border-2 w-fit py-1 px-2 rounded shadow hover:border-indigo-300 hover:shadow-indigo-300 text-center'
    const activeClass = `${baseClass} border-green-600 bg-green-200`
    const inactiveClass = `${baseClass} border-gray-500`
    return (
        <div role="group">
            <div className="flex gap-2">
                <label className="inline-flex items-center relative cursor-pointer">
                    <Field
                        className="absolute opacity-0 pointer-events-none"
                        type="radio"
                        name={'units'}
                        value={Unit.Metric}
                    />
                    <span className={field.value === Unit.Metric ? activeClass : inactiveClass}>Metric</span>
                </label>
                <label className="inline-flex items-center relative cursor-pointer">
                    <Field
                        className="absolute opacity-0 pointer-events-none"
                        type="radio"
                        name={'units'}
                        value={Unit.Imperial}
                    />
                    <span className={field.value === Unit.Imperial ? activeClass : inactiveClass}>Imperial</span>
                </label>
            </div>
        </div>
    )
}
