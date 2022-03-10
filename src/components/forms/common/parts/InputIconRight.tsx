import React, { ReactNode } from 'react'

interface IInputIconRight {
    onClick: (value: any) => void
    children: ReactNode
}

export const InputIconRight = ({ onClick, children }: IInputIconRight) => {
    return (
        <div
            className="absolute top-1/2 -translate-y-1/2 right-3 hover:bg-gray-200 p-1 rounded-full cursor-pointer z-10"
            onClick={onClick}
        >
            {children}
        </div>
    )
}
