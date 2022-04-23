import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    primary?: boolean
    warning?: boolean
    danger?: boolean
    outline?: boolean
    solid?: boolean
    customStyle?: string
}

export const Button = ({
    title,
    primary,
    solid,
    outline,
    warning,
    danger,
    customStyle,
    onClick,
    type = 'button',
    ...props
}: IButton) => {
    const solidStyle =
        'text-white disabled:text-gray-200 disabled:bg-slate-500 disabled:pointer-events-none hover:shadow active:shadow-none active:translate-y-0.5'
    const outlineStyle =
        'border-2 disabled:text-gray-200 disabled:bg-slate-500 disabled:pointer-events-none disabled:border-none hover:shadow active:shadow-none active:translate-y-0.5'
    const primarySolidStyle = `${solidStyle} bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring focus:ring-sky-400`
    const primaryOutlineStyle = `${outlineStyle} border-sky-600 text-sky-600 hover:bg-sky-100 hover:border-sky-700 focus:outline-none focus:ring focus:ring-sky-400`
    const warningSolidStyle = `${solidStyle} bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-400`
    const warningOutlineStyle = `${outlineStyle} border-yellow-600 text-yellow-600 hover:bg-yellow-100 focus:outline-none focus:ring focus:ring-yellow-400`
    const dangerSolidStyle = `${solidStyle} bg-red-700 hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-400`
    const dangerOutlineStyle = `${outlineStyle} border-red-600 text-red-600 hover:bg-red-100 focus:outline-none focus:ring focus:ring-red-400`
    const style = customStyle
        ? customStyle
        : primary && outline
        ? primaryOutlineStyle
        : primary
        ? primarySolidStyle
        : warning && outline
        ? warningOutlineStyle
        : warning
        ? warningSolidStyle
        : danger && outline
        ? dangerOutlineStyle
        : danger
        ? dangerSolidStyle
        : solid
        ? primarySolidStyle
        : outline
        ? primaryOutlineStyle
        : primarySolidStyle
    return (
        <button
            className={`w-full rounded-md text-md font-medium py-3 px-5 cursor-pointer ${style} translate-y inset`}
            {...{ type, onClick, ...props }}
        >
            {title}
        </button>
    )
}
