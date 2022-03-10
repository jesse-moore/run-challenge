import React, { MouseEventHandler, ReactNode } from 'react'

export interface INavLogo {
    children: ReactNode
    href?: string
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

export const NavLogo = React.forwardRef<HTMLAnchorElement, INavLogo>(({ children, ...props }: INavLogo, ref) => {
    return (
        <a ref={ref} {...props}>
            <div className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-gray-700">
                {children}
            </div>
        </a>
    )
})
