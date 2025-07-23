
"use client";

import { Filter } from "lucide-react";
import { useState } from "react";
import CourseCard from "./CourseCard";

// Define the extended type for courses including category
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

const categories = ["All Course", "Ideation", "Development", "Photography", "Management"];

// Sample courses data - replace with your actual data source
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
        courseTitle: "Advanced Ideation",
        lessons: 15,
        students: 300, // More students
        level: "Advanced",
        rating: 5,

        category: "Ideation"
    },
    {
        id: "3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Web Development",
        lessons: 24,
        students: 500, // Most students
        level: "Intermediate",
        rating: 5,

        category: "Development"
    },
    {
        id: "4",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Advanced Photography",
        lessons: 18,
        students: 400,
        level: "Advanced",
        rating: 4,

        category: "Photography"
    },
    {
        id: "5",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Project Management",
        lessons: 20,
        students: 350,
        level: "Beginner",
        rating: 4,

        category: "Management"
    },
    {
        id: "6",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemfOsGnToNBlKsNYP69zv43ataC98LL_mtg&s",
        courseTitle: "Product Management",
        lessons: 22,
        students: 450,
        level: "Intermediate",
        rating: 5,
        category: "Management"
    },

    // Add more courses as needed
];


const NewCourses = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Course");
    const [activeCategory, setActiveCategory] = useState("All Course");

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    const applyFilter = () => {
        setActiveCategory(selectedCategory);
    };

    const filteredCourses = activeCategory === "All Course"
        ? courses
        : courses.filter(course => course.category === activeCategory);
    const isActive = selectedCategory === activeCategory;
    return (

        <section className="container mx-auto px-4 py-8">
            {/* Filter Navigation */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <h4 className="text-xl font-semibold text-gray-900 font-roboto">NEW COURSES</h4>
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



                    <button
                        onClick={applyFilter}
                        className={`group p-2 rounded-xl shadow-sm transition-colors
              ${isActive
                            ? 'bg-gray-200 text-white hover:bg-yellow-500'
                            : 'bg-yellow-500 text-gray-700 hover:bg-gray-900'}`}
                    >
                        <Filter
                            className={`w-5 h-5 transition-colors
                ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-white'}`}
                        />
                    </button>



                </div>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map((course, index) => (
                        <CourseCard
                            key={index}
                            {...course}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                    <div className="text-center max-w-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No courses found
                        </h3>
                        <p className="text-gray-600 mb-4">
                            No courses match the selected filter criteria.
                        </p>
                        <button
                            className="px-4 py-2 bg-gray-900 text-gray-400  rounded-lg hover:bg-yellow-500"
                            onClick={() => {
                                setSelectedCategory("All Course");
                                setActiveCategory("All Course");
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};
export default NewCourses;