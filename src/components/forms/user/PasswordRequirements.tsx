import React, { ReactNode } from 'react'

interface IPasswordRequirements {
    children: ReactNode
}

export const PasswordRequirements = ({ children }: IPasswordRequirements) => {
    return <div className="flex flex-col -mt-6 ml-2">{children}</div>
}

interface IPasswordRequirement {
    requirement: string
    isValid: boolean
    isTouched: boolean
}

export const PasswordRequirement = ({ requirement, isValid, isTouched }: IPasswordRequirement) => {
    const color = isValid ? 'text-green-600' : isTouched ? 'text-red-600' : 'text-gray-700'
    return <div className={`text-xs font-medium ${color}`}>{requirement}</div>
}
