import React, { ReactNode, useState } from 'react'
import { isArray } from 'util'

interface ITabs {
    children: [ReactNode] | ReactNode
    activeTab: number
}

export const Tabs = ({ activeTab, children }: ITabs) => {
    const tabs = Array.isArray(children) ? children.length : 1
    return (
        <div className="flex relative w-fit">
            {children}
            <span
                className={`absolute bottom-0 border-b-2 border-b-[#5a67d8] h-8 transition-transform pointer-events-none`}
                style={{ transform: `translateX(${activeTab * 100}%)`, width: `${(1 / tabs) * 100}%` }}
            ></span>
        </div>
    )
}

interface ITab {
    title: string
    isActive?: boolean
}

export const Tab = ({ isActive, title }: ITab) => {
    return (
        <button
            className={`font-medium uppercase relative py-3 text-center w-36 text-sm cursor-pointer select-none focus:outline-none ${
                isActive ? 'text-[#5a67d8]' : 'text-gray-700'
            }`}
        >
            {title}
        </button>
    )
}
