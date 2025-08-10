"use client";
import React, { useState } from "react";
import axios from "axios";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const SendEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        setStatus("loading");
        setErrorMsg("");

        try {

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/newsletter/subscribe`,
                { email }
            );

            setStatus("success");
            setEmail("");
        } catch (error: any) {
            setStatus("error");
            setErrorMsg(error.response?.data?.message || "Failed to subscribe.");
        }
    };

    return (
        <section
            className="w-full bg-cover bg-center bg-no-repeat py-12 px-4"
            style={{
                backgroundImage: "url('/assets/images/NewsLetter/background.png')",
            }}
        >
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
                    <div className="absolute inset-0 bg-cyan-900 rounded-[50px] -z-10"></div>

                    <form
                        onSubmit={SendEmail}
                        className="flex items-center w-full bg-white rounded-[16px] overflow-hidden shadow-lg"
                    >
                        <input
                            type="email"
                            placeholder="Email Address..."
                            className="flex-1 px-6 py-4 text-black placeholder-gray-400 outline-none"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-black hover:bg-yellow-500 text-white font-bold px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? "Submitting..." : "SUBMIT"}
                        </button>
                    </form>

                    {/* Feedback messages */}
                    {status === "success" && (
                        <p className="mt-2 text-green-600">Successfully subscribed!</p>
                    )}
                    {status === "error" && (
                        <p className="mt-2 text-red-600">{errorMsg}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
