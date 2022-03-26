import React from 'react'

export const FormSuccess = ({ message }: { message: string }) => {
    return <div className="text-sm text-green-600 font-medium mb-2">{message}</div>
}
