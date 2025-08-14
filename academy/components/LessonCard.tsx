"use client"
import React, {useEffect, useState} from "react";
import {
    ThumbsUp,
    ThumbsDown,
    Share2,
    CheckIcon,

} from "lucide-react";
import Image from "next/image";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";
import {Course} from "@/app/models/course.model";
import axios from "axios";

const LessonCard= ({ params }: { params: { id: string } }) => {
    const _id = params.id;

    const [course, setCourse] = useState<Course>();
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No token found");
                return;
            }

            try {
                const res = await axios.get<{ data: Course }>(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCourse(res.data.data);
            } catch (err: any) {
                console.error("Fetch error:", err);
                setError(err.response?.data?.message || "Failed to fetch course");
            }
        };

        fetchCourse();
    }, [_id]);

    const isAbsoluteUrl = (url: string) => /^https?:\/\//.test(url);

    const tutorImg = course?.owner?.image
        ? isAbsoluteUrl(course?.owner?.image)
            ? course?.owner?.image
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${course?.owner?.image.startsWith("/") ? "" : "/"}${course?.owner?.image}`
        : "/assets/images/brand/logo.png";

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bg-black text-white p-6 rounded-xl max-w-4xl mx-auto shadow-lg space-y-4">
            {/* Course Title */}
            <h2 className="text-2xl md:text-3xl font-semibold">Course –   {course.courseTitle}</h2>

            {/* Video Section */}


            <CustomVideoPlayer
                sources={{
                    sd: "/videos/lesson1_sd.mp4",
                    hd: "/videos/lesson1_hd.mp4",
                }}
                poster="/assets/images/course/courseCover.png"
            />

            {/* Lesson Info */}
            <div className="flex items-start gap-4">
                <Image
                    src={tutorImg}
                    alt="Instructor"
                    width={48}
                    height={48}
                    className="rounded-full"
                />
                <div className=" justify-between items-start w-full gap-2">
                    <div className="flex items-center m">
                        <h3 className="text-lg md:text-xl font-medium">
                            Lesson 1 – <span className="font-semibold">Implement Story telling</span>
                        </h3>
                    </div>


                    <div className="flex items-center justify-between text-sm text-gray-400">
                        {/* Left side: Tutor name + check */}
                        <div className="flex items-center space-x-1">
                            <span className="font-semibold">Tutor name</span> &nbsp;

                            <CheckIcon className="bg-primary text-black border-none size-4 rounded p-0.5" stroke="black" />


                        </div>

                        {/* Right side: Thumbs, Share, etc */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-green-400">
                                <ThumbsUp size={16}  />
                                <span>145</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400">
                                <ThumbsDown size={16} />
                                <span>6</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400">
                                <Share2 size={16} />
                                <span>6</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                This module would provide strategies for providing exceptional customer
                service and creating a welcoming and comfortable environment for visitors.
                It would cover topics such as communication skills, problem-solving,
                and attention to detail. Participants would learn how to anticipate and
                respond to the needs of visitors, and how to create a hospitable and
                inclusive environment for all.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                <button className="px-6 py-2 border border-gray-400  rounded-lg text-sm hover:bg-gray-800 transition">
                    Skip To The Test
                </button>
                <button className="px-6 py-2 bg-white text-black font-medium rounded-lg text-sm hover:bg-gray-200 transition">
                    Test Your Knowledge
                </button>
            </div>
        </div>
    );
};

export default LessonCard;
