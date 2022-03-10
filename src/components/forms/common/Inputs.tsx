import React from 'react'
import { Field, useField } from 'formik'

export const DateInput = ({ label, name }) => {
    const [field, meta] = useField(name)
    const baseClass =
        'border-2 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
    const untouchedClass = `${baseClass} border-gray-300`
    const validClass = `${baseClass} border-green-600 bg-green-100`
    const errorClass = `${baseClass} border-red-600 bg-red-100`
    return (
        <div>
            <label className="block">
                <span className="text-gray-700">{label}</span>
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

interface ICheckBoxInput {
    label: string
    name: string
}

const Checkbox = ({ label, ...props }: ICheckBoxInput) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' })
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {label}
            </label>
            {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
    )
}

interface IRadioGroup {
    label: string
    name: string
    radios: { label: string; value: string; disabled?: boolean }[]
}

const RadioGroup = ({ label, radios, ...props }: IRadioGroup) => {
    const [field, meta] = useField(props)
    const errorClass = `border-red-600`
    return (
        <div role="group">
            <div className="text-gray-700 mb-2">{label}</div>
            {radios.map(({ label, value }) => {
                return (
                    <label className="inline-flex items-center">
                        <Field
                            className={meta.touched && meta.error ? errorClass : undefined}
                            type="radio"
                            name={props.name}
                            value={value}
                        />
                        <span className="mx-2">{label}</span>
                    </label>
                )
            })}
            {meta.touched && meta.error ? <div className="text-sm text-red-600 font-medium">{meta.error}</div> : null}
        </div>
    )
}

export const CustomRadio = ({ label, radios, ...props }: IRadioGroup) => {
    const [field, meta] = useField(props)
    const baseClass =
        'border-2 w-full py-1 rounded-md shadow-sm hover:border-indigo-300 hover:shadow-indigo-300 text-center'
    const activeClass = `${baseClass} border-green-600 bg-green-100`
    const inactiveClass = `${baseClass} border-gray-300`
    const errorClass = `${baseClass} border-red-600 bg-red-100`
    const disabledClass = `${baseClass} border-gray-400 bg-gray-200 cursor-not-allowed hover:border-gray-400 hover:shadow-none`
    return (
        <div role="group">
            <div className="text-gray-700 mb-2 text-sm">{label}</div>
            <div className="flex gap-4">
                {radios.map(({ label, ...childProps }) => {
                    const isSelected = field.value === childProps.value
                    return (
                        <label className="inline-flex items-center relative cursor-pointer w-full" key={label}>
                            <Field
                                className="absolute opacity-0 cursor-pointer"
                                type="radio"
                                name={props.name}
                                {...childProps}
                            />
                            <span
                                className={
                                    meta.touched && meta.error
                                        ? errorClass
                                        : isSelected
                                        ? activeClass
                                        : childProps.disabled
                                        ? disabledClass
                                        : inactiveClass
                                }
                            >
                                {label}
                            </span>
                        </label>
                    )
                })}
            </div>
            {meta.touched && meta.error ? <div className="text-sm text-red-600 font-medium">{meta.error}</div> : null}
        </div>
    )
}


