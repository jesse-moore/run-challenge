import { useField } from 'formik'
import React, { InputHTMLAttributes } from 'react'
import { InputError } from './parts'
export interface ICheckBoxInput extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    readonly?: boolean
}

export const CheckBoxInput = ({ label, name, ...props }: ICheckBoxInput) => {
    const [field] = useField<number | string>(name)
    return (
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                    id={name}
                    aria-describedby={name}
                    type="checkbox"
                    className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    {...field}
                    {...props}
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor={name} className="font-medium text-gray-900 dark:text-gray-300">
                    {label}
                </label>
            </div>
        </div>
    )
}
