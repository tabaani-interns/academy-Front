"use client";

import { Filter } from "lucide-react";
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import { Course } from "@/app/models/course.model";

const categories = [
    "All Courses",
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Design",
    "Business"
];

const NewCourses = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Courses"); // default selected
    const [activeCategory, setActiveCategory] = useState("All Courses"); // default applied filter
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

                if (!res) {
                    throw new Error("Failed to fetch courses");
                }

                const now = new Date();
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(now.getDate() - 7);

                const newCourses = res.data.data
                    .filter((course: Course) => {
                        const createdDate = new Date(course.createdAt!);
                        return createdDate > oneWeekAgo;
                    })
                    .sort(
                        (a: Course, b: Course) =>
                            new Date(b.createdAt!).getTime() -
                            new Date(a.createdAt!).getTime()
                    )
                    .slice(0, 8);

                setCourses(newCourses);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                console.error(err);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // just select category without applying immediately
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    // apply filter when clicking Filter button
    const applyFilter = () => {
        setActiveCategory(selectedCategory);
    };

    const filteredCourses =
        activeCategory === "All Courses"
            ? courses
            : courses.filter(
                (course) =>
                    course.category?.toLowerCase() ===
                    activeCategory.toLowerCase()
            );

    if (loading) {
        return (
            <section className="container mx-auto px-4 py-8">
                <p>Loading new courses...</p>
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
            <div className="flex  gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <h4 className="text-xl font-semibold text-gray-900 font-roboto">
                        NEW THIS WEEK
                    </h4>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                    </span>
                </div>

                <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-xl text-black whitespace-nowrap transition-all ${
                                selectedCategory === category
                                    ? "bg-gray-100 shadow font-medium font-semibold "
                                    : "text-gray-700 "
                            }`}
                            onClick={() => handleCategorySelect(category)}
                        >
                            <p className="hover:text-yellow-500">{category}</p>
                        </button>
                    ))}

                    {/* Filter button applies the selected category */}
                    <button
                        onClick={applyFilter}
                        className="group p-2 rounded-xl shadow-sm transition-colors
                            bg-yellow-500 text-gray-700 hover:bg-gray-900"
                    >
                        <Filter
                            className="w-5 h-5 transition-colors text-gray-600 group-hover:text-white"
                        />
                    </button>
                </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map((course, index) => (
                        <div key={index} className="relative">
                            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                NEW
                            </div>
                            <CourseCard {...course} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                    <div className="text-center max-w-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No courses to display
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Select a category and click the filter button to see results.
                        </p>
                        <button
                            className="px-4 py-2 bg-gray-900 text-gray-400 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors"
                            onClick={() => {
                                setSelectedCategory("All Courses");
                                setActiveCategory("All Courses");
                            }}
                        >
                            View All Courses
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default NewCourses;
