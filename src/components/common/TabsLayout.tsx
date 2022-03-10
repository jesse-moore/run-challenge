import React, { ReactNode } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { Tab, Tabs } from './Tabs'

interface ITabsLayout {
    children: ReactNode
    tabs: { path: string; title: string }[]
}

const TabsLayout = ({ children, tabs }: ITabsLayout) => {
    const [activeTab, setActiveTab] = useState<number>(0)

    return (
        <>
            <div>
                <Tabs activeTab={activeTab}>
                    {tabs.map((tab, i) => {
                        return (
                            <Link href={tab.path} key={tab.title}>
                                <a>
                                    <Tab
                                        title={tab.title}
                                        isActive={activeTab === i}
                                        onClick={() => setActiveTab(i)}
                                        key={tab.title}
                                    />
                                </a>
                            </Link>
                        )
                    })}
                </Tabs>
            </div>
            {children}
        </>
    )
}

export default TabsLayout
