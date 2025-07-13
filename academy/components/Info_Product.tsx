import { Users } from 'lucide-react' // Student icon (Users)
import React from 'react'

interface InfoProductProps {
    icon?: React.ReactNode
    label: string
    value?: string | number
}

const InfoProduct = ({ icon = <Users />, label, value }: InfoProductProps) => {
    return (
        <div className="flex items-center gap-2   p-4 rounded-xl  ">
            <div className="text-gray-600">{icon}</div>
            <div className="text-gray-800 font-medium">
                {label}
                {value !== undefined && (
                    <span className="ml-2 font-semibold text-black">{value}</span>
                )}
            </div>
        </div>
    )
}

export default InfoProduct
