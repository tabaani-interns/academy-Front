import React from 'react'
import LessonCard from "@/components/LessonCard";



const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    return (
        <LessonCard params={{ id }}/>
    )
}
export default Page
