import Link from 'next/link'
import { useEffect } from 'react'
import { ChallengeForm } from '../components/forms/admin'
import testChallenge from '../test/CNFullChallenge'

const Admin = () => {
    useEffect(() => {}, [])

    return (
        <div>
            <h2>ADMIN</h2>
            <div className="mt-8 max-w-2xl mx-auto">
                <ChallengeForm initialValues={testChallenge} />
            </div>
        </div>
    )
}

export default Admin
