import Image from 'next/image'

interface InstructorCardProps {
    name: string
    specialty: string
    imageUrl: string
}

const InstructorCard = ({ name, specialty, imageUrl }: InstructorCardProps) => {
    return (
        <div className="w-full max-w-[250px] bg-white rounded-xl shadow p-4 flex flex-col items-center  p-[10px]">
                 <div className="w-full h-full  ">
                    <Image
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover rounded-[6px]"
                        width={120}
                        height={120}
                    />
            </div>

            <div className="flex justify-between w-full text-sm px-1 p-[10px]">
                <span className="font-medium text-gray-900">{name}</span>
                <span className="text-gray-500">{specialty}</span>
            </div>

        </div>
    )
}

export default InstructorCard
