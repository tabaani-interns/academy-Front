"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@/app/models/user.model";
import Image from "next/image";

const Profile = () => {
    const [formData, setFormData] = useState<User>();
    const [originalData, setOriginalData] = useState<User>();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId) {
            setError("User ID not found");
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await axios.get<{ data: User }>(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res || !res.data?.data) throw new Error("Failed to fetch user");

                setFormData(res.data.data);
                setOriginalData(res.data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev!,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!userId || !formData || !originalData) {
                setError("User data is incomplete");
                return;
            }

            const updatedUser: Partial<User> = {};

            if (formData.firstName !== originalData.firstName) {
                updatedUser.firstName = formData.firstName;
            }
            if (formData.lastName !== originalData.lastName) {
                updatedUser.lastName = formData.lastName;
            }
            if (formData.email !== originalData.email) {
                updatedUser.email = formData.email;
            }
            if (formData.role !== originalData.role) {
                updatedUser.role = formData.role;
            }

            if (Object.keys(updatedUser).length === 0) {
                setMessage("No changes to update.");
                return;
            }

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${userId}`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Profile updated successfully");
            setOriginalData(formData);
            setEditing(false);
        } catch (err: any) {
            setError(err.message || "Update failed");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!formData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
                    <p className="text-red-600">Failed to load profile.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  bg-primary flex items-center justify-center py-10 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">
                <div className="md:flex">
                    {/* Profile Sidebar */}
                    <div className="bg-orange-50 md:w-1/3 flex flex-col items-center p-8 border-b md:border-b-0 md:border-r border-orange-200">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-orange-400 shadow-md">
                            <Image
                                src={formData.image || "/assets/images/brand/logo.png"}
                                alt="User Avatar"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-orange-700">
                            {formData.firstName} {formData.lastName}
                        </h2>
                        <p className="text-gray-500">{formData.role}</p>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">Member since</p>
                            <p className="font-medium text-gray-700">
                                {new Date(formData.createdAt || "").toLocaleDateString()}
                            </p>
                        </div>
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-sm"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* Profile Form */}
                    <div className="md:w-2/3 p-8">
                        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6">
                            {editing ? "Edit Profile Information" : "Profile Information"}
                        </h3>

                        {!editing ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">First Name</label>
                                    <p className="mt-1 p-3 bg-gray-50 rounded-lg border">{formData.firstName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Last Name</label>
                                    <p className="mt-1 p-3 bg-gray-50 rounded-lg border">{formData.lastName}</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-500">Email</label>
                                    <p className="mt-1 p-3 bg-gray-50 rounded-lg border">{formData.email}</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Role</label>
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        >
                                            <option value="Student">Student</option>
                                            <option value="Tutor">Tutor</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow-sm"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditing(false)}
                                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 shadow-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        {(message || error) && (
                            <div
                                className={`mt-6 p-3 rounded-lg text-center ${
                                    message
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {message || error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
