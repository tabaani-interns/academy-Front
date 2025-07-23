import Image from 'next/image'

interface InstructorMiniProps {
    name: string
    specialty: string
    imageUrl: string
}

const InstructorMini = ({ name, specialty, imageUrl }: InstructorMiniProps) => {
    return (
        <div className="flex items-center gap-3">
            <Image
                src={imageUrl}
                alt={name}
                width={40}
                height={40}
                className="rounded-[10px] object-cover"
            />
            <div>
                <div className="font-semibold text-gray-800">{name}</div>
                <div className="text-xs text-gray-500">{specialty}</div>
            </div>
        </div>
    )
}

export default InstructorMini
