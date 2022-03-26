import React from 'react'

export const FormError = ({ error }: { error: string }) => {
    return <div className="text-red-600 font-medium">{error}</div>
}
