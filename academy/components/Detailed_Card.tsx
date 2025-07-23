'use client'
import Image from 'next/image'
import InfoProduct from './Info_Product'
import InstructorMini from './Instructor_Mini'
import { Users, BookOpen, Clock } from 'lucide-react'
import React from 'react'
import PointsBar from "@/components/Points_Bar";

interface DetailedCardProps {
    courseTitle: string
    courseImage: string
    instructorName: string
    instructorSpecialty: string
    instructorImage: string
    students: number
    lessons: number
    duration: string
    points: number
    totalPoints: number
    days: number
}

const DetailedCard = ({
                          courseTitle,
                          courseImage,
                          instructorName,
                          instructorSpecialty,
                          instructorImage,
                          students,
                          lessons,
                          duration,
                          points,
                          totalPoints,
                          days,
                      }: DetailedCardProps) => {
    return (
        <div className="flex flex-row bg-gray-50 rounded-xl shadow overflow-hidden max-w-[850px] min-h-[250px] max-h-[500px] p-[10px]">
            {/* Left - Course Image */}
            <div className="relative min-w-[300px] h-auto aspect-[3/4] md:aspect-auto rounded-[10px] overflow-hidden">
                <Image
                    src={courseImage}
                    alt={courseTitle}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Right - Content */}
            <div className="flex flex-col justify-between flex-1 px-4 py-3">
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {courseTitle}
                </h2>

                {/* Info Row */}
                <div className="flex flex-wrap gap-4 text-sm mb-3">
                    <InfoProduct icon={<Users size={14} />} label="Students :" value={students} />
                    <InfoProduct icon={<BookOpen size={14} />} label="Lessons :" value={lessons} />
                    <InfoProduct icon={<Clock size={14} />} label="Duration :" value={duration} />
                </div>

                {/* PointsBar with dynamic points */}
                <div className="text-xs text-gray-600 mb-3">
                    <PointsBar points={points} totalPoints={totalPoints} days={days} />
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between">
                    <InstructorMini
                        name={instructorName}
                        specialty={instructorSpecialty}
                        imageUrl={instructorImage}
                    />
                    <button className="text-sm bg-dark text-white px-3 py-1.5 rounded hover:bg-gray-700 transition">
                        Let's Go →
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailedCard
