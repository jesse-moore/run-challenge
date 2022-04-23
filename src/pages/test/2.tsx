import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { ProtectedRoute } from '../../components/common/ProtectedRoute'
import TabsLayout from '../../components/common/TabsLayout'
import ProfileLayout from '../../components/profile/profileLayout'

export default function Two() {
    const router = useRouter()
    useEffect(() => {
        console.log('FIRST RENDER')
    }, [])

    useEffect(() => {
        // Always do navigations after the first render
        // router.push('2/?counter=10', undefined, { shallow: true })
    }, [])

    return (
        <div>
            {/* <TabsLayout
                tabs={[
                    { title: 'Overview', path: '/test/1' },
                    { title: 'Settings', path: '/test/2' },
                ]}
            > */}
            <Link href="1">
                <a>One</a>
            </Link>
            <Link href="2">
                <a>Two</a>
            </Link>
            <div>---Two---</div>
            {/* </TabsLayout> */}
        </div>
    )
}
