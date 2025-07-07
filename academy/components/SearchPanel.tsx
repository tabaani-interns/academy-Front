"use client";

import React, { useState } from "react";

const SearchPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Categories");

  const categories = [
    "Categories",
    "Web Development",
    "Data Science",
    "Design",
    "Business",
    "Marketing",
    "Programming",
    "Mobile Development",
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Add your search logic here
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* Header Section - Centered Text */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-black leading-tight font-roboto">
          Search Between <span className="text-red">100</span> Courses And
          <br />
          Find Your Favorite Course
        </h1>
      </div>

      {/* Search Bar Section - Centered Below Header */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center bg-white border border-stroke rounded-full shadow-lg max-w-3xl w-full">
          {/* Left side - Categories Button */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-black text-white px-6 py-4 rounded-l-full text-button font-medium min-w-[140px] appearance-none cursor-pointer border-none outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Center - Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search Anything"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-white text-black placeholder-gray-400 text-body outline-none border-none"
            />
          </div>

          {/* Right side - Search Icon */}
          <button
            onClick={handleSearch}
            className="p-4 hover:bg-gray-50 rounded-r-full transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Subtext Section - Below and to the Right of Search Bar */}
      <div className="flex items-center justify-end max-w-3xl mx-auto">
        <div className="flex items-center space-x-2">
          <p className="text-body text-amber-800">
            Or View The Following Courses…
          </p>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L12 18L17 13"
              stroke="#D0F5F5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
