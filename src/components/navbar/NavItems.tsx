import React, { ReactNode, useContext } from 'react'
import { NavContext } from './NavBar'
export interface INavItems {
    children: ReactNode
    open?: boolean
}

export const NavItems = ({ children }: INavItems) => {
    const { openNavbar } = useContext(NavContext)
    return (
        <div className={`lg:flex flex-grow items-center ${openNavbar ? 'block' : 'hidden'}`}>
            <ul className={`flex lg:items-center flex-col lg:flex-row list-none ml-auto gap-x-4`}>{children}</ul>
        </div>
    )
}
