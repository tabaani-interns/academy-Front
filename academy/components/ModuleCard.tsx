import React from "react";

interface Lesson {
  title: string;
  href: string;
}

interface ModuleCardProps {
  icon?: React.ReactNode;
  title: string;
  lessons: Lesson[];
  lessonCount: number;
  duration: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  icon,
  title,
  lessons,
  lessonCount,
  duration,
}) => {
  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          {icon || <span className="text-xl">📘</span>}
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-1 text-[#171717]">{title}</h3>
<p className="text-sm text-gray-600 mb-4">
  {lessonCount} Lessons / {duration}
</p>

      <hr className="mb-4" />
      <ul className="text-sm space-y-1">
  {lessons.map((lesson, index) => (
    <li key={index}>
      <a href={lesson.href} className="text-blue-600 hover:underline">
        {lesson.title}
      </a>
    </li>
  ))}
</ul>

    </div>
  );
};

export default ModuleCard;
