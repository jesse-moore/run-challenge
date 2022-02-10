import { useFormikContext, FieldArray } from 'formik'
import dayjs from 'dayjs'
import { CustomIntervalEntryForm } from './CustomIntervalEntryForm'
import { ChallengeFormDto } from '../../../../dtos/ChallengeFormDto'

export const CustomIntervalForm = () => {
    const { values } = useFormikContext<ChallengeFormDto>()
    const { intervals, start, numberOfIntervals } = values
    return (
        <>
            <div className="mx-auto text-lg font-medium">
                Intervals <span>({numberOfIntervals} Days)</span>
            </div>
            <FieldArray
                name="intervals"
                render={() => {
                    return intervals
                        .filter((_, i) => i < numberOfIntervals)
                        .map((interval, index) => {
                            const date = dayjs(start).add(index, 'day').format('dddd, MMMM DD, YYYY')
                            return <CustomIntervalEntryForm {...{ date, interval, index }} key={`intervals.${index}`} />
                        })
                }}
            />
        </>
    )
}
