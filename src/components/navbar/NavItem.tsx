import React, { LegacyRef, MouseEventHandler, MutableRefObject, ReactElement, ReactNode, Ref } from 'react'

export interface INavItem {
    active?: boolean
    children: ReactNode
    href?: string
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export const NavItem = React.forwardRef<HTMLAnchorElement, INavItem>(
    ({ active, children, ...props }: INavItem, ref) => {
        return (
            <a {...props} ref={ref}>
                <li
                    className={`${
                        active ? 'text-[#5a67d8] bg-white shadow' : 'text-gray-700'
                    } px-5 py-3 flex gap-1 items-center text-sm font-medium rounded-lg hover:text-[#5a67d8]`}
                >
                    {children}
                </li>
            </a>
        )
    }
)
