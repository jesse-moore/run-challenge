import React, { useState } from 'react'

export const Tabs = () => {
    const [activeTab, setActiveTab] = useState<number>(0)

    return (
        <>
            <div className="flex mx-2 mt-2 rounded-md bg-gray-100 relative tabs">
                <button
                    className={`tabs-item relative z-10 py-1 my-2 ml-2 text-center rounded-md w-full text-sm cursor-pointer select-none focus:outline-none ${
                        activeTab === 0 && 'active'
                    }`}
                    onClick={() => setActiveTab(0)}
                >
                    Light
                </button>
                <button
                    className={`tabs-item relative z-10 py-1 my-2 ml-2 text-center rounded-md w-full text-sm cursor-pointer select-none focus:outline-none ${
                        activeTab === 1 && 'active'
                    }`}
                    onClick={() => setActiveTab(1)}
                >
                    Dark
                </button>
                <button
                    className={`tabs-item relative z-10 py-1 my-2 ml-2 text-center rounded-md w-full text-sm cursor-pointer select-none focus:outline-none ${
                        activeTab === 2 && 'active'
                    }`}
                    onClick={() => setActiveTab(2)}
                >
                    System
                </button>

                <span
                    className={`absolute top-[6px] w-[33.33%] left-1 h-8 rounded-md bg-white transition-transform`}
                    style={{ transform: `translateX(${activeTab * 100}%)` }}
                ></span>
            </div>
        </>
    )
}
