import React from "react";
import CourseOverview from "@/components/CourseOverview";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-[280px] p-4 border-r bg-white shadow-sm hidden md:block">
        <CourseOverview />
      </aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default layout;
