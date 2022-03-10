import React, { ReactElement } from 'react'
import AdminLayout from '../../components/admin/adminLayout'

export default function Users() {
    return <div>Users</div>
}

Users.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}
