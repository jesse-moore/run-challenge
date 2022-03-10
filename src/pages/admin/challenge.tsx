import React, { ReactElement } from 'react'
import AdminLayout from '../../components/admin/adminLayout'

export default function Challenge() {
    return <div>challenge</div>
}

Challenge.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}
