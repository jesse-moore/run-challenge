import React, { createContext, ReactElement, useState } from 'react'
import { INavItems } from './NavItems'
import { INavLogo } from './NavLogo'

interface INavContext {
    openNavbar: boolean
}

export const NavContext = createContext<INavContext>({ openNavbar: false })
interface INavBar {
    children: [ReactElement<INavLogo>, ReactElement<INavItems>]
}

export const NavBar = ({ children }: INavBar) => {
    const [openNavbar, setOpenNavbar] = useState<boolean>(false)
    const [logo, navItems] = children

    return (
        <NavContext.Provider value={{ openNavbar }}>
            <nav className={`flex flex-wrap items-center justify-between py-2.5 px-3 mb-3 bg-[#edf2f7]`}>
                <div className="w-full max-w-5xl px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full flex justify-between md:w-auto md:static md:block md:justify-start">
                        {logo}
                        <button
                            className="cursor-pointer text-xl leading-none py-1 px-1.5 rounded-full border border-solid border-transparent bg-transparent block md:hidden outline-none focus:outline-none hover:bg-white hover:bg-opacity-20 transition-all duration-300"
                            onClick={() => setOpenNavbar(!openNavbar)}
                        >
                            <span className={`block relative w-6 h-px rounded-sm bg-gray-700`}></span>
                            <span className={`block relative w-6 h-px rounded-sm bg-gray-700 mt-1`}></span>
                            <span className={`block relative w-6 h-px rounded-sm bg-gray-700 mt-1`}></span>
                        </button>
                    </div>
                    <div className='w-full md:w-auto' onClick={() => setOpenNavbar(false)}>{navItems}</div>
                </div>
            </nav>
        </NavContext.Provider>
    )
}
