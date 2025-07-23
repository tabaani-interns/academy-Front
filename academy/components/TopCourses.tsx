"use client";
import React, {useState, useRef} from 'react'
import {Filter, ChevronLeft, ChevronRight} from "lucide-react";
import CourseCard from "@/components/CourseCard";

type CourseWithCategory = {
    id: string;
    image: string;
    courseTitle: string;
    lessons: number;
    students: number;
    level: string;
    rating: number;

    category: string;
};


// Sample course data - replace with your actual data source
const courses: CourseWithCategory[] = [
    {
        id: "1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Ideation Masterclass",
        lessons: 12,
        students: 150,
        level: "Beginner",
        rating: 4,

        category: "Ideation"
    },
    {
        id: "2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Ideation Masterclass",
        lessons: 12,
        students: 150,
        level: "Beginner",
        rating: 4,

        category: "Ideation"
    },
    {
        id: "3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Ideation Masterclass",
        lessons: 12,
        students: 150,
        level: "Beginner",
        rating: 4,

        category: "Ideation"
    },
    {
        id: "4",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Ideation Masterclass",
        lessons: 12,
        students: 150,
        level: "Beginner",
        rating: 4,

        category: "Ideation"
    },
    {
        id: "5",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Ideation Masterclass",
        lessons: 12,
        students: 150,
        level: "Beginner",
        rating: 4,

        category: "Ideation"
    },

    {
        id: "6",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Web Development",
        lessons: 24,
        students: 320,
        level: "Intermediate",
        rating: 5,

        category: "Development"
    },
    {
        id: "7",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Web Development",
        lessons: 24,
        students: 320,
        level: "Intermediate",
        rating: 5,

        category: "Development"
    },
    {
        id: "8",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Web Development",
        lessons: 24,
        students: 320,
        level: "Intermediate",
        rating: 5,
        category: "Development"
    },

];

const TopCourses = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Course");
    const [activeCategory, setActiveCategory] = useState("All Course");
    const categoriesRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    const applyFilter = () => {
        setActiveCategory(selectedCategory);
    };

    const sortedCourses = [...courses].sort((a, b) => b.students - a.students);
    const filteredCourses =
        activeCategory === "All Course"
            ? sortedCourses
            : sortedCourses.filter((course) => course.category === activeCategory);

    // Scroll by 2 cards (calculates width dynamically)
    const scrollByCards = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const card = container.firstChild as HTMLElement;
            if (!card) return;

            // Calculate scroll distance (width of 2 cards + gap)
            const cardWidth = card.offsetWidth;
            const gap = 24; // gap-6 = 1.5rem ≈ 24px
            const scrollDistance = 2 * (cardWidth + gap);

            container.scrollBy({
                left: direction === "left" ? -scrollDistance : scrollDistance,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="container mx-auto px-4 py-8">
            {/* Filter Navigation */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <h4 className="text-xl font-semibold text-gray-900 font-roboto">
                        TOP COURSES
                    </h4>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scrollByCards("left")}
                        className="p-2 rounded-xl font-medium font-semibold hover:bg-yellow-500"
                    >
                        <ChevronLeft className="w-5 h-5 text-black" />
                    </button>
                    <button
                        onClick={() => scrollByCards("right")}
                        className="p-2 rounded-xl font-medium font-semibold hover:bg-yellow-500"
                    >
                        <ChevronRight className="w-5 h-5 text-black" />
                    </button>
                </div>
            </div>

            {/* Horizontal Scrollable Courses */}
            {filteredCourses.length > 0 ? (
                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory"
                    >
                        {filteredCourses.map((course, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-[360px] snap-start" // Fixed width for consistent scrolling
                            >
                                <CourseCard {...course} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-xl font-semibold text-gray-800">No courses found</p>
                </div>
            )}
        </section>
    );
};

export default TopCourses;