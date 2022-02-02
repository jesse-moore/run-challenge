import Link from 'next/link'
import { useEffect } from 'react'
import { ActivityManualEntryForm } from '../components/forms/user'
import testChallenge from '../test/data/CNFullChallenge'

const ActivityEntry = () => {
    useEffect(() => {}, [])

    return (
        <div>
            <h2>ADMIN</h2>
            <div className="mt-8 max-w-2xl mx-auto">
                <ActivityManualEntryForm/>
            </div>
        </div>
    )
}

export default ActivityEntry
