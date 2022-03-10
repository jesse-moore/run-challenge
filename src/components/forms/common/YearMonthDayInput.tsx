import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { SelectInput, TextInput } from '.'
import { useField } from 'formik'

export interface IYearMonthDayInput {
    label: string
    name: string
    readonly?: boolean
    disabled?: boolean
    showError?: boolean
    indicateValidity?: boolean
}

export const YearMonthDayInput = ({ name, label, showError }: IYearMonthDayInput) => {
    const [months, setMonths] = useState([])

    useEffect(() => {
        const months = []
        Array.from(Array(12)).forEach((_, i) => {
            const date = new Date(`2022-${i + 1}-15`)
            const month = date.toLocaleString('default', { month: 'long' })
            months.push({ name: month, value: i + 1 })
        })
        setMonths(months)
    }, [])

    return (
        <div>
            <div className='text-gray-600'>{label}</div>
            <div className="flex flex-row gap-x-4">
                <TextInput
                    name={name ? `${name}.year` : 'year'}
                    label="Year"
                    type="number"
                    showError={showError}
                    step={1}
                />
                <SelectInput
                    name={name ? `${name}.month` : 'month'}
                    label="Month"
                    options={months}
                    showError={showError}
                />
                <TextInput
                    name={name ? `${name}.day` : 'day'}
                    label="Day"
                    type="number"
                    step={1}
                    showError={showError}
                />
            </div>
        </div>
    )
}
