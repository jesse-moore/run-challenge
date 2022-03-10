import React, { ReactNode, useContext } from 'react'
import { NavContext } from './NavBar'
export interface INavItems {
    children: ReactNode
    open?: boolean
}

export const NavItems = ({ children }: INavItems) => {
    const { openNavbar } = useContext(NavContext)
    return (
        <div className={`md:flex flex-grow items-center ${openNavbar ? 'block' : 'hidden'}`}>
            <ul className={`flex md:items-center flex-col md:flex-row list-none ml-auto gap-x-4`}>{children}</ul>
        </div>
    )
}
