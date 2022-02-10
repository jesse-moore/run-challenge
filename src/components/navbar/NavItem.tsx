import React, { LegacyRef, MouseEventHandler, MutableRefObject, ReactElement, ReactNode, Ref } from 'react'

export interface INavItem {
    active: boolean
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
                        active && 'bg-slate-500'
                    } px-5 py-4 flex gap-1 items-center text-sm font-medium text-white rounded-lg hover:bg-slate-500`}
                >
                    {children}
                </li>
            </a>
        )
    }
)
