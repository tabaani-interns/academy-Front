"use client";

import React, {useEffect, useState} from 'react'
import {CircleCheck, Clock5, CoinsIcon, Menu, SignalHigh} from "lucide-react";
import {Course} from "@/app/models/course.model";
import axios from "axios";

const CourseDetails  = ({ params }: { params: { id: string } }) => {

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

    return (

        <section className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row w-full gap-4">

                <div className="flex flex-col md:flex-1 gap-4">
                    <div className="flex flex-col md:flex-row gap-4">

                        <div className="flex-1 bg-white p-4 start-0">
                            <span className="text-2xl text-black mb-4 block">Course Detail</span>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Menu  className="text-primary w-5 h-5" />
                                    <span>Modules : {course?.modules}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Clock5 className="text-primary w-5 h-5" />
                                    <span>Hours : {course?.hours}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <SignalHigh className="text-primary w-5 h-5" />
                                    <span>{course?.level}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CoinsIcon className="text-primary  w-5 h-5" />
                                    <span>Price : {course?.price}</span>
                                </div>

                            </div>

                        </div>

                        <div className="flex-1 bg-white p-4 start-0">
                            <span className="text-2xl text-black mb-4 block">Course Features</span>
                            <div className="mt-2 space-y-2">
                                {course?.features?.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 text-gray-700">
                                        <div className="bg-green-500  rounded-full">
                                            <CircleCheck className="text-white w-5 h-5" />
                                        </div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>


                <div className="flex-1 bg-white p-4 start-0">
                    <span className="text-2xl text-black mb-4 block">About this course</span>
                    <div>
                        <p className="text-gray-600">
                            {course?.description}
                        </p>
                    </div>
                </div>

            </div>


        </section>
    )
}
export default CourseDetails
