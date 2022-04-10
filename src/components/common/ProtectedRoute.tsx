import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../lib/context/useAuth'

export const ProtectedRoute = ({ children, roles }: { children: React.ReactNode; roles?: string[] }) => {
    const router = useRouter()
    const auth = useAuth()
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        if (auth.isLoaded && !auth.user) {
            router.push('/')
        } else if (auth.isLoaded && auth.user) {
            if (roles && !auth.user.groups) {
                router.push('/')
            } else if (roles && auth.user.groups) {
                const authorizedRole = roles.reduce((a, c) => {
                    return auth.user.groups.includes(c) ? true : a
                }, false)
                setIsAuthorized(authorizedRole)
            } else {
                setIsAuthorized(true)
            }
        }
    }, [children, auth.isLoaded, auth.user])

    if (isAuthorized) {
        return <div>{children}</div>
    } else {
        return null
    }
}
