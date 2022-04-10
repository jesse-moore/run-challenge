import React, { ReactNode, useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { Tab, Tabs } from './Tabs'
import { useRouter } from 'next/router'

interface ITabsLayout {
    children: ReactNode
    tabs: { path: string; title: string }[]
}

const TabsLayout = ({ children, tabs }: ITabsLayout) => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<number>(0)

    useEffect(() => {
        console.log('RENDER')
    }, [])

    useEffect(() => {
        for (let i = 0; i < tabs.length; i++) {
            if (router.pathname.includes(tabs[i].path)) {
                setActiveTab(i)
            }
        }
    }, [activeTab])

    return (
        <>
            <div>
                <Tabs activeTab={activeTab}>
                    {tabs.map((tab, i) => {
                        return (
                            <Link href={tab.path} key={tab.title}>
                                <a>
                                    <Tab title={tab.title} isActive={activeTab === i} key={tab.title} />
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
