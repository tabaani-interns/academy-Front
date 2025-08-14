"use client"
import React, {useEffect, useState} from "react";

import {Search, Bell, ChevronDown, User2} from "lucide-react";
import axios from "axios";
import {User} from "@/app/models/user.model";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Header =  () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {

      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const fetchUser = async () => {

        if (!userId) {
          setError("No user ID found");
          return;
        }

        if (!token) {
          setError("No token found");
          return;
        }
        try {
          const res = await axios.get<{ data: User }>(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${userId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
          );
          setUser(res.data.data);
        } catch (err: any) {
         console.error("Fetch error:", err.message);
          setError(err.message);
        }
      };

    if(userId){
      fetchUser()
    }

  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    router.push('/login');

  };

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

            {/* User Section */}
            <div className="flex items-center space-x-3">
              {user ? (
                  <div className="flex items-center space-x-4">
                    <Link href="/profile">
                      <div className="flex items-center space-x-2">
                        <Image
                            src={user.image || "/assets/images/brand/logo.png"}
                            alt="User Image"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <div className="hidden sm:block">
                          <p className="text-gray-700">{user.firstName}</p>
                          <p className="text-gray-500">{user.role}</p>
                        </div>
                      </div>
                    </Link>

                    {/* Notification Bell */}
                    <button className="relative p-2 bg-primary-5 rounded-md hover:bg-primary-10 transition-colors">
                      <Bell className="h-6 w-6 text-primary" />
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-2 bg-gray-100 text-gary-400 rounded hover:bg-red-600 transition"
                    >
                      Logout
                    </button>


                  </div>
              ) : (
                  <Link href="/login">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-primary-5 hover:bg-primary-10 rounded-md transition">
                      <Image
                          src="/assets/images/brand/logo.png"
                          alt="Profile Icon"
                          width={24}
                          height={24}
                          className="rounded-full"
                      />
                      <span className="text-gray-700">Login / Sign-Up</span>
                    </button>
                  </Link>
              )}

            </div>


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
