
import React, {useRef, useState} from 'react'
import {ChevronLeft, ChevronRight} from "lucide-react";


const skills = [
    { icon: "📊", label: "Analytics and data insights" },
    { icon: "📈", label: "Business strategy" },
    { icon: "📄", label: "Content marketing" },
    { icon: "🖥️", label: "Display your experience" },
    { icon: "🛍️", label: "Booking" },
    { icon: "✉️", label: "Reviews" },
    { icon: "📈", label: "Business strategy" },
    { icon: "📄", label: "Content marketing" },
    { icon: "🖥️", label: "Display your experience" },
    { icon: "🛍️", label: "Booking" },
    { icon: "✉️", label: "Reviews" },
    { icon: "🛍️", label: "Booking" },
    { icon: "✉️", label: "Reviews" },
    { icon: "📈", label: "Business strategy" },
    { icon: "📄", label: "Content marketing" },
    { icon: "🖥️", label: "Display your experience" },
    { icon: "🛍️", label: "Booking" },
    { icon: "✉️", label: "Reviews" },
    { icon: "🛍️", label: "Booking" },
    { icon: "✉️", label: "Reviews" },
    { icon: "📈", label: "Business strategy" },
    { icon: "📄", label: "Content marketing" },
    { icon: "🖥️", label: "Display your experience" },
    { icon: "🛍️", label: "Booking" },
    { icon: "✉️", label: "Reviews" },
];

const CourseSkills = () => {




    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const scroll = (direction: "left" | "right") => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = 200;
        container.scrollBy({
            left: direction === "right" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });

        // delay to let scroll happen
        setTimeout(() => {
            setIsScrolled(container.scrollLeft > 0);
        }, 300);
    };

    return (
        <section className="py-12 px-4 bg-white text-center relative">
            <h2 className="text-3xl font-semibold mb-8 text-gray-800">
                Skills you'll learn
            </h2>

            {/* Scrollable container */}
            <div className="relative flex items-center justify-center max-w-[1500px] mx-auto">

            {/* Left button */}
                {isScrolled && (
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 z-10 w-10 h-10 rounded-full bg-gray-50 shadow text-gray-500 hover:bg-gray-100"
                    >
                        <ChevronLeft className="mx-auto" />
                    </button>
                )}

                {/* Scrollable items */}
                <div
                    ref={scrollRef}
                    className="flex gap-10 overflow-x-auto scroll-smooth px-12 no-scrollbar"
                >

                {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center cursor-pointer group p-8 max-w-[220px] w-full"
                        >
                            <div className="text-2xl mb-6  text-gray-700 group-hover:text-black">
                                {skill.icon}
                            </div>
                            <span className="text-sm text-gray-500 group-hover:text-black">
                {skill.label}
              </span>
                            {/* Rectangle orange visible on hover */}
                            <div className="mt-2 w-12 h-[3px] bg-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>
                    ))}
                </div>

                {/* Right button */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 z-10 w-10 h-10 rounded-full bg-gray-50 shadow text-gray-500 hover:bg-gray-100"
                >
                    <ChevronRight className="mx-auto" />
                </button>
            </div>
        </section>
    );
};
    export default CourseSkills;
