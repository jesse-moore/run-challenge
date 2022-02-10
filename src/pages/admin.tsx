import Link from 'next/link'
import { useEffect } from 'react'
import { ChallengeForm } from '../components/forms/admin'
import testChallenge from '../../test/data/CNFullChallenge'
import { Tabs } from '../components/Tabs'

const Admin = () => {
    useEffect(() => {}, [])

    return (
        <div>
            <Tabs />
            <h2>ADMIN</h2>
            <div className="mt-8 max-w-2xl mx-auto">
                <ChallengeForm initialValues={testChallenge} />
            </div>
        </div>
    )
}

export default Admin
