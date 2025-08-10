"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import CourseCard from "@/components/CourseCard";
import {Course} from "@/app/model/course.model";



const TopCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found");
                    return;
                }

                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/getAllCourses`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res || !res.data?.data) {
                    throw new Error("Failed to fetch courses");
                }

                // Sort by rating (descending) with students as tiebreaker
                const sorted = res.data.data.sort(
                    (a: Course, b: Course) =>
                        b.rating! - a.rating! || b.students! - a.students!
                );

                // Take top 10 courses
                const topRatedCourses = sorted.slice(0, 10);

                setCourses(topRatedCourses);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || "An error occurred");
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const scrollByCards = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const card = container.firstChild as HTMLElement;
            if (!card) return;

            const cardWidth = card.offsetWidth;
            const gap = 24;
            const scrollDistance = 2 * (cardWidth + gap);

            container.scrollBy({
                left: direction === "left" ? -scrollDistance : scrollDistance,
                behavior: "smooth",
            });
        }
    };

    if (loading) {
        return (
            <section className="container mx-auto px-4 py-8">
                <p>Loading top courses...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="container mx-auto px-4 py-8">
                <p className="text-red-500">Error: {error}</p>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <h4 className="text-xl font-semibold text-gray-900 font-roboto">TOP COURSES</h4>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scrollByCards("left")}
                        className="p-2 rounded-xl hover:bg-yellow-500"
                    >
                        <ChevronLeft className="w-5 h-5 text-black" />
                    </button>
                    <button
                        onClick={() => scrollByCards("right")}
                        className="p-2 rounded-xl hover:bg-yellow-500"
                    >
                        <ChevronRight className="w-5 h-5 text-black" />
                    </button>
                </div>
            </div>

            {/* Course List */}
            {courses.length > 0 ? (
                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
                    >
                        {courses.map((course, index) => (
                            <div key={index} className="flex-shrink-0 w-[360px] snap-start">
                                <CourseCard  {...course} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-600 py-12">No top courses available.</div>
            )}
        </section>
    );
};

export default TopCourses;