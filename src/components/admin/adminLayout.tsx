import { ReactNode } from 'react'
import TabsLayout from '../../components/common/TabsLayout'

interface IAdminLayout {
    children: ReactNode
}

export default function AdminLayout({ children }: IAdminLayout) {
    return (
        <div>
            <TabsLayout
                tabs={[
                    { title: 'Challenge', path: '/admin/challenge' },
                    { title: 'Users', path: '/admin/users' },
                ]}
            >
                {children}
            </TabsLayout>
        </div>
    )
}
