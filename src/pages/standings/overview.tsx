import React, { ReactElement } from 'react'
import ProfileLayout from '../../components/profile/profileLayout'

export default function Overview() {
    return <div>Overview</div>
}

Overview.getLayout = function getLayout(page: ReactElement) {
    return <ProfileLayout>{page}</ProfileLayout>
}
