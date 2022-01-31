import { Formik, Form, useFormikContext, useField } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'
import { ActivityManualEntryDto, Duration } from '../../../dtos/ActivityDto'
import { UnitRadio } from '../admin/challenge/UnitRadio'
import { useEffect, useState } from 'react'
import timezones from '../../../utils/timezones.json'
dayjs.extend(duration)
dayjs.extend(timezone)

interface IActivityManualEntryForm {
    initialValues?: ActivityManualEntryDto
}

export const ActivityManualEntryForm = ({ initialValues = new ActivityManualEntryDto() }: IActivityManualEntryForm) => {
    const validationSchema = Yup.object({})

    const onSubmit = (values, { setTouched, setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
        }, 400)
    }

    return (
        <Formik<ActivityManualEntryDto> {...{ initialValues, validationSchema }} onSubmit={onSubmit}>
            <ManualEntryForm />
        </Formik>
    )
}

const ManualEntryForm = () => {
    const { values, setFieldValue } = useFormikContext<ActivityManualEntryDto>()

    return (
        <Form className="grid grid-cols-1 gap-6">
            <div className="ml-auto">
                <UnitRadio />
            </div>
            <div className="flex gap-4 justify-between">
                <DateInput name="date" />
                <TimeInput name="time" />
                <TimeZoneInput name="timezone" />
            </div>
            <div className="flex gap-4 justify-between">
                <NumberInput name="distance" label="Distance" unit="km" />
                <NumberInput name="elevationGain" label="Elevation Gain" unit="m" optional />
                <DurationInput name="duration" label="Duration" />
            </div>
            {/* <Submit /> */}
            <button type="button" onClick={() => console.log(values)}>
                VALUES
            </button>
        </Form>
    )
}

export const TimeZoneInput = ({ name }: { name: string }) => {
    const [field, meta, helper] = useField(name)

    useEffect(() => {
        const userTimezone = dayjs.tz.guess()
        helper.setValue(userTimezone)
    }, [])

    return (
        <div className="w-fit">
            <label className='flex flex-col'>
                <span className="font-medium text-gray-700">Timezone</span>
                <select className="rounded-md w-64" {...field}>
                    {Object.keys(timezones).map((tz) => (
                        <option key={tz}>{tz}</option>
                    ))}
                </select>
            </label>
        </div>
    )
}

export const DateInput = ({ name }: { name: string }) => {
    const [field, meta, helper] = useField(name)
    const baseClass =
        'border-2 w-full block rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
    const untouchedClass = `${baseClass} border-gray-300`
    const validClass = `${baseClass} border-green-600 bg-green-100`
    const errorClass = `${baseClass} border-red-600 bg-red-100`
    return (
        <div className="w-fit">
            <label className="">
                <span className="font-medium text-gray-700">Date:</span>
                <input
                    className={meta.touched ? (meta.error ? errorClass : validClass) : untouchedClass}
                    {...field}
                    type="date"
                />
            </label>
            {meta.touched && meta.error ? <div className="text-sm text-red-600 font-medium">{meta.error}</div> : null}
        </div>
    )
}

export const TimeInput = ({ name }: { name: string }) => {
    const [field, meta, helper] = useField(name)
    const baseClass =
        'border-2 w-full block rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
    const untouchedClass = `${baseClass} border-gray-300`
    const validClass = `${baseClass} border-green-600 bg-green-100`
    const errorClass = `${baseClass} border-red-600 bg-red-100`
    return (
        <div className="w-fit">
            <label className="">
                <span className="font-medium text-gray-700">Time:</span>
                <input
                    className={meta.touched ? (meta.error ? errorClass : validClass) : untouchedClass}
                    {...field}
                    type="time"
                />
            </label>
            {meta.touched && meta.error ? <div className="text-sm text-red-600 font-medium">{meta.error}</div> : null}
        </div>
    )
}

interface INumberInput {
    label: string
    name: string
    placeholder?: string
    unit?: string
    optional?: boolean
}

export const NumberInput = ({ label, name, unit, optional, ...props }: INumberInput) => {
    const [field] = useField(name)

    return (
        <div className="flex flex-col w-fit">
            <label htmlFor={name}>
                <div>
                    <span className="font-medium whitespace-nowrap">{label}</span>
                    {optional && <span className="text-sm ml-1 whitespace-nowrap">(optional)</span>}
                </div>
            </label>
            <div className="flex flex-row w-full gap-2">
                <input
                    id={name}
                    {...field}
                    {...props}
                    className="border w-16 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    type="number"
                />
                <span className="self-end">{unit}</span>
            </div>
        </div>
    )
}

interface IDurationInput {
    name: string
    label: string
}

export const DurationInput = ({ name, label }: IDurationInput) => {
    const [field, meta, helpers] = useField<Duration>(name)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)

    const handelBlurHours = () => {
        if (hours > 23 && minutes > 0) {
            setHours(23)
        } else if (hours > 24) {
            setHours(24)
        }
        setDuration()
    }

    const handelBlurMinutes = () => {
        if (hours === 24) {
            setMinutes(0)
        } else if (minutes > 59) {
            setMinutes(59)
        }
        setDuration()
    }

    const handelBlurSeconds = () => {
        if (hours === 24) {
            setSeconds(0)
        } else if (seconds > 59) {
            setSeconds(59)
        }
        setDuration()
    }

    const setDuration = () => {
        helpers.setValue({ hours, minutes, seconds })
    }

    return (
        <div className="w-fit">
            <span className="font-medium">{label}</span>
            <div className="flex flex-row gap-3 w-fit">
                <label className="flex flex-row items-center gap-2 w-full">
                    <input
                        className="border w-12 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="number"
                        min="0"
                        max="24"
                        name={`${name}-hours`}
                        value={hours}
                        onChange={({ target }) => setHours(target.value !== '' ? Number(target.value) : undefined)}
                        onBlur={handelBlurHours}
                    />
                    <span className="self-end">Hours</span>
                </label>
                <label className="flex flex-row items-end gap-2">
                    <input
                        className="border w-12 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="number"
                        min="0"
                        max="60"
                        name={`${name}-minutes`}
                        value={minutes}
                        onChange={({ target }) => setMinutes(target.value !== '' ? Number(target.value) : undefined)}
                        onBlur={handelBlurMinutes}
                    />
                    <span className="self-end">Minutes</span>
                </label>
                <label className="flex flex-row items-end gap-2">
                    <input
                        className="border w-12 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="number"
                        min="0"
                        max="60"
                        name={`${name}-seconds`}
                        value={seconds}
                        onChange={({ target }) => setSeconds(target.value !== '' ? Number(target.value) : undefined)}
                        onBlur={handelBlurSeconds}
                    />
                    <span className="self-end">Seconds</span>
                </label>
            </div>
        </div>
    )
}
