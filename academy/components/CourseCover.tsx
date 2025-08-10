"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Course } from "@/app/model/course.model";

const CourseCover = ({ params }: { params: { id: string } }) => {
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

    const imgUrl = course?.image
        ? isAbsoluteUrl(course.image)
            ? course.image
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${course.image.startsWith("/") ? "" : "/"}${course.image}`
        : "";

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <section>
            <div className="w-full relative">
                <Image
                    src={imgUrl}
                    alt="Course cover"
                    className="w-full max-h-[700px] object-cover"
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                />
                <div className="absolute bottom-0 left-0 right-0 h-63 bg-gradient-to-t from-white/70 to-transparent pointer-events-none" />
            </div>

            <div className="bg-white py-10 px-6 md:px-20">
                <div className="inline-flex items-center mb-4">
                    <div className="bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-2">
                        <span className="text-orange-600">🏅</span> INCLUDES CERTIFICATE
                    </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
                    {course.courseTitle}
                </h1>
                <p className="text-gray-500 text-lg mb-6">
                    {course.subtitle}
                </p>

                <div className="flex items-center gap-6 mb-8">
                    <Image
                        src="/assets/images/course/open-university-logo.png"
                        alt="Open University"
                        width={40}
                        height={40}
                    />
                    <Image
                        src="/assets/images/course/iab-europe-logo.png"
                        alt="IAB Europe"
                        width={40}
                        height={40}
                    />
                </div>

                <Link href={`/lessonPage/${course._id}`}>
                    <button className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-primary transition">
                        Start Course
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default CourseCover;
