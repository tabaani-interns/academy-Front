"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, CheckSquare } from "lucide-react";
import Image from "next/image";

const modulesData = [
  {
    id: 1,
    title: "Introduction to Hosting",
    icon: "/assets/icons/module1.svg", // use your icons
    lessons: [
      { id: 1, title: "Lesson 1: Introduction", duration: "1 min", type: "lesson" },
      { id: 2, title: "Quick Quiz", type: "quiz", completed: true },
      { id: 3, title: "Lesson 2: How to create a good plan", type: "lesson" },
      { id: 4, title: "Quick Quiz", type: "quiz", completed: false },
    ],
  },
  {
    id: 2,
    title: "Create your profile",
    icon: "/assets/icons/module2.svg",
    lessons: [],
  },
  {
    id: 3,
    title: "Storytelling",
    icon: "/assets/icons/module3.svg",
    lessons: [],
  },
  {
    id: 4,
    title: "Pricing strategy",
    icon: "/assets/icons/module4.svg",
    lessons: [],
  },
  {
    id: 5,
    title: "Hosting guidelines",
    icon: "/assets/icons/module5.svg",
    lessons: [],
  },
];

const CourseOverview = () => {
  const [activeModule, setActiveModule] = useState<number | null>(1);

  const toggleModule = (id: number) => {
    setActiveModule(prev => (prev === id ? null : id));
  };

  return (
    <aside className="w-full max-w-xs bg-white rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold mb-4">Course Overview</h2>

      <ul className="space-y-2">
        {modulesData.map((module) => (
          <li key={module.id} className="border rounded-md overflow-hidden">
            <button
              onClick={() => toggleModule(module.id)}
              className={`flex items-center justify-between w-full px-3 py-2 transition ${
                activeModule === module.id ? "bg-[#ffaf20]/10" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={module.icon}
                  alt="Module Icon"
                  width={28}
                  height={28}
                  className={`rounded ${
                    activeModule === module.id ? "bg-[#ffaf20]" : "bg-gray-200"
                  } p-1`}
                />
                <span className="text-sm font-medium text-left">{module.title}</span>
              </div>
              {activeModule === module.id ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Expand Lessons */}
            {activeModule === module.id && module.lessons.length > 0 && (
              <div className="bg-white px-4 py-2 space-y-1 text-sm border-t">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex justify-between items-center">
                    <span className="text-[#3e3232]">
                      {lesson.title}
                    </span>
                    {lesson.type === "lesson" && (
                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                    )}
                    {lesson.type === "quiz" && lesson.completed && (
                      <CheckSquare className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CourseOverview;
