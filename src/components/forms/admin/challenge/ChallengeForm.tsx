import { useEffect } from 'react'
import { Form, useFormikContext } from 'formik'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
import { CustomRadio, DateInput } from '../../common/Inputs'
import { IntervalForm } from './IntervalForm'
import { ChallengeType } from '../../../../dtos/ChallengeDto'
import { UnitRadio } from './UnitRadio'
import { Submit } from './Submit'
import { ChallengeFormDto, ChallengeIntervalFormDto } from '../../../../dtos/ChallengeFormDto'
import { TextInput } from '../../common'

export const ChallengeForm = () => {
    const { values, setFieldValue } = useFormikContext<ChallengeFormDto>()

    useEffect(() => {
        const { end, start, intervals } = values
        if (!end || !start) return
        const days = Math.ceil(dayjs.duration(dayjs(end).diff(dayjs(start))).asDays() + 1)
        if (isNaN(days) || days < 1) return
        if (intervals.length === 0) {
            const newIntervals = [...Array(days)].map((_, i) => new ChallengeIntervalFormDto(i))
            setFieldValue('intervals', newIntervals)
        } else if (intervals.length < days) {
            const additionalIntervals = [...Array(days - intervals.length)].map(
                (_, i) => new ChallengeIntervalFormDto(i)
            )
            const newIntervals = [...intervals, ...additionalIntervals]
            setFieldValue('intervals', newIntervals)
        }
        setFieldValue('numberOfIntervals', days)
    }, [values.start, values.end])

    return (
        <Form className="grid grid-cols-1 gap-6">
            <div className="ml-auto">
                <UnitRadio />
            </div>
            <TextInput label="Name" name="name" />
            <DateInput label="Start Date" name="start" />
            <DateInput label="End Date" name="end" />
            <CustomRadio
                label="Challenge Type"
                name="type"
                radios={[
                    { label: 'Interval', value: ChallengeType.Interval },
                    {
                        label: 'Single',
                        value: ChallengeType.Single,
                        disabled: true,
                    },
                ]}
            />
            {values.type === 'interval' && <IntervalForm />}
            <Submit />
        </Form>
    )
}
