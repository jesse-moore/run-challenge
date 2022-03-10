import { ReactNode } from 'react'
import TabsLayout from '../../components/common/TabsLayout'

interface IProfileLayout {
    children: ReactNode
}

export default function ProfileLayout({ children }: IProfileLayout) {
    return (
        <div>
            <TabsLayout
                tabs={[
                    { title: 'Overview', path: '/profile/overview' },
                ]}
            >
                {children}
            </TabsLayout>
        </div>
    )
}
