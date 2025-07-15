"use client";

import { useState } from "react";
import Image from "next/image";

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div
        className={`${isCollapsed ? "w-[100px]" : "w-[350px]"} bg-gray-900 border-r border-gray-800 fixed h-full transition-all duration-300 ease-in-out`}
      >
        {/* Logo section */}
        <div className="p-6 border-b border-gray-800 relative">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            {!isCollapsed && (
              <div className="transition-opacity duration-300">
                <h1 className="text-white font-semibold text-lg">Tabaani</h1>
                <p className="text-gray-400 text-sm">Academy</p>
              </div>
            )}
          </div>
          {/* Toggle button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-8 bg-gray-800 border border-gray-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <svg
              className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="p-4 pb-[200px]">
          <ul className="space-y-2">
            <li>
              <a
                href="/courses"
                className={`flex items-center ${isCollapsed ? "justify-center px-3" : "space-x-3 px-4"} py-3 rounded-lg bg-white text-primary-75 transition-all duration-300`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {!isCollapsed && (
                  <span className="transition-opacity duration-300">
                    My Courses
                  </span>
                )}
              </a>
            </li>
            <li>
              <button
                className={`w-full flex items-center ${isCollapsed ? "justify-center px-3" : "space-x-3 px-4"} py-3 rounded-lg text-primary-75 hover:bg-gray-800 transition-all duration-300`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                {!isCollapsed && (
                  <span className="transition-opacity duration-300">
                    Dashboard
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center ${isCollapsed ? "justify-center px-3" : "space-x-3 px-4"} py-3 rounded-lg text-primary-75 hover:bg-gray-800 transition-all duration-300`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2.5a.5.5 0 00-1 0v3a.5.5 0 001 0v-3zm2.5 0a.5.5 0 00-1 0v3a.5.5 0 001 0v-3z"
                    clipRule="evenodd"
                  />
                </svg>
                {!isCollapsed && (
                  <span className="transition-opacity duration-300">
                    Progress
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center ${isCollapsed ? "justify-center px-3" : "space-x-3 px-4"} py-3 rounded-lg text-primary-75 hover:bg-gray-800 transition-all duration-300`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
                {!isCollapsed && (
                  <span className="transition-opacity duration-300">
                    Profile
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center ${isCollapsed ? "justify-center px-3" : "space-x-3 px-4"} py-3 rounded-lg text-primary-75 hover:bg-gray-800 transition-all duration-300`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                {!isCollapsed && (
                  <span className="transition-opacity duration-300">
                    Settings
                  </span>
                )}
              </button>
            </li>
            <li>
              <a
                href="/courses/quiz"
                className={`w-full flex items-center ${isCollapsed ? "justify-center px-3" : "space-x-3 px-4"} py-3 rounded-lg text-primary-75 hover:bg-gray-800 transition-all duration-300`}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {!isCollapsed && (
                  <span className="transition-opacity duration-300">Quiz</span>
                )}
              </a>
            </li>
          </ul>
        </nav>

        {/* Support section at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {!isCollapsed ? (
            // Full support image as button when expanded
            <button className="w-full hover:scale-105 transition-transform duration-200">
              <Image
                src="/assets/svgs/support.svg"
                alt="Support 24/7"
                width={320}
                height={200}
                className="w-full h-auto object-contain max-h-[200px]"
              />
            </button>
          ) : (
            // Help icon when collapsed
            <div className="flex justify-center">
              <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary-75 transition-colors">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div
        className={`flex-1 ${isCollapsed ? "ml-[100px]" : "ml-[350px]"} transition-all duration-300 ease-in-out`}
      >
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
