import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-h3 font-roboto font-bold text-gray-900">
              ACADEMY
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-button font-roboto">
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {/* Dropdown menu can be added here */}
            </div>
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-button font-roboto">
              Partner
            </button>
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-button font-roboto">
              Contact Us
            </button>
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-button font-roboto">
              About Us
            </button>
          </nav>

          {/* Search and User Section */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search Anything"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-input font-roboto"
              />
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-body2 font-roboto font-medium text-gray-700">
                    H
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-subtitle2 font-roboto text-gray-700">
                    Hamza,
                  </p>
                  <p className="text-body2 font-roboto text-gray-500">
                    Local Host
                  </p>
                </div>
              </div>
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 bg-primary-5 rounded-md hover:bg-primary-10 transition-colors">
              <Bell className="h-6 w-6 text-primary" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          <button className="flex items-center text-gray-700 hover:text-gray-900 block px-3 py-2 text-button font-roboto w-full text-left">
            Categories
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          <button className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-button font-roboto">
            Partner
          </button>
          <button className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-button font-roboto">
            Contact Us
          </button>
          <button className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-button font-roboto">
            About Us
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
