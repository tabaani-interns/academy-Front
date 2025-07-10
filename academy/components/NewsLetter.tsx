"use client";
import React from "react";

const Newsletter = () => {
    const SendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Subscribed");
    };

    return (
        <section
            className="w-full bg-cover bg-center bg-no-repeat py-12 px-4"
            style={{
                backgroundImage: "url('/assets/images/NewsLetter/background.png')",
            }}
        >
            {/* Optional white overlay for readability */}

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Left Text */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-bold text-black leading-snug">
                            Find Out About The Latest Courses With The <br />
                            <span className="text-cyan-900">Academy</span> Newsletter
                        </h2>
                    </div>

                    {/* Right: Form with rounded dark background */}
                    <div className="relative w-full max-w-xl">
                        {/* Blue curved background */}
                        <div className="absolute inset-0 bg-cyan-900 rounded-[50px] -z-10"></div>

                        {/* Form */}
                        <form
                            onSubmit={SendEmail}
                            className="flex items-center w-full bg-white rounded-[16px] overflow-hidden shadow-lg"
                        >
                            <input
                                type="email"
                                placeholder="Email Address..."
                                className="flex-1 px-6 py-4 text-black placeholder-gray-400 outline-none"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-black hover:bg-yellow-500 text-white font-bold px-6 py-4"
                            >
                                SUBMIT
                            </button>
                        </form>
                    </div>
                </div>

        </section>
    );
};

export default Newsletter;
