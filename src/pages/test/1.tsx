import Link from 'next/link'
import React, { ReactElement } from 'react'
import { ProtectedRoute } from '../../components/common/ProtectedRoute'
import TabsLayout from '../../components/common/TabsLayout'
import ProfileLayout from '../../components/profile/profileLayout'

export default function One() {
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
            <div>---One---</div>
            {/* </TabsLayout> */}
        </div>
    )
}
