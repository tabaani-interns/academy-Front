"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ModuleCard from "./ModuleCard";

const modules = [
  {
    title: "The Hosting opportunity",
    lessonCount: 2,
    duration: "10 min",
    lessons: [
      { title: "Intro to Tabaani Platform", href: "#" },
      { title: "Your hosting opportunity", href: "#" },
    ],
  },
  {
    title: "Your first steps in Hosting success",
    lessonCount: 4,
    duration: "20 min",
    lessons: [
      { title: "Your hosting goals", href: "#" },
      { title: "Building your profile", href: "#" },
      { title: "Marketing your online presence", href: "#" },
      { title: "Analyse and adapt", href: "#" },
    ],
  },
  {
    title: "Build your Experience",
    lessonCount: 6,
    duration: "40 min",
    lessons: [
      { title: "Choosing your theme", href: "#" },
      { title: "How bookings work", href: "#" },
      { title: "Key website ingredients", href: "#" },
      { title: "Websites and your business goals", href: "#" },
      { title: "Make your experience easy to book", href: "#" },
      { title: "Experience design do's and don'ts", href: "#" },
    ],
  },
  {
    title: "Plan your Pricing strategy",
    lessonCount: 5,
    duration: "30 min",
    lessons: [
      { title: "The benefits of Pricing strategy", href: "#" },
      { title: "Taking a business online", href: "#" },
      { title: "Understanding guest behaviour", href: "#" },
      { title: "How to stand out from the competition", href: "#" },
      { title: "Using goals to improve profile performance", href: "#" },
    ],
  },
  {
    title: "Get discovered with search",
    lessonCount: 5,
    duration: "35 min",
    lessons: [
      { title: "Intro to search engine optimisation (SEO)", href: "#" },
      { title: "The importance of an SEO plan", href: "#" },
      { title: "The SEO process", href: "#" },
      { title: "How to choose keywords", href: "#" },
      { title: "Setting realistic SEO goals", href: "#" },
    ],
  },
];

const ModulesSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
  
    const scroll = (direction: "left" | "right") => {
      const container = scrollRef.current;
      if (!container) return;
      const scrollAmount = 300;
      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    };
  
    return (
      <section className="relative px-4 md:px-10 py-10">
        <h2 className="text-2xl font-bold mb-8 text-center text-[#171717]">
          Modules ({modules.length})
        </h2>
  
        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
  
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
  
        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {modules.map((module, index) => (
            <motion.div
              key={index}
              className="snap-start flex-shrink-0 w-[280px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ModuleCard {...module} />
            </motion.div>
          ))}
        </div>
      </section>
    );
  };
  
export default ModulesSection;
