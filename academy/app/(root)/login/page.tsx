"use client";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff, Lock, Mail, Rocket } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/sign-in`,
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("userId", res.data.data.user._id);

            router.push("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff8f2] to-[#ffeadd] flex items-center justify-center p-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
                {/* Branding Section */}
                <div className="w-full md:w-2/5 bg-gradient-to-br from-orange-500 to-amber-600 text-white p-8 md:p-12 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <Rocket className="text-white" size={28} />
                            </div>
                            <h1 className="text-2xl font-bold">Tabaani</h1>
                        </div>

                        <h2 className="text-3xl font-bold mb-4">
                            Welcome Back to Tabaani
                        </h2>
                        <p className="text-white/90 mb-8">
                            Your journey continues here. Sign in to access your personalized dashboard and continue where you left off.
                        </p>
                    </div>

                    <div className="hidden md:block">
                        <div className="bg-white/10 p-4 rounded-xl mb-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <Rocket className="text-amber-200" size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Lightning Fast Experience</h3>
                                    <p className="text-sm text-white/80">Optimized for your productivity</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Expert Instructors</h3>
                                    <p className="text-sm text-white/80">Learn from industry professionals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Login Form Section */}
                <div className="w-full md:w-3/5 bg-white p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Sign in to continue
                        </h1>
                        <p className="text-gray-600">
                            Access your account to manage your dashboard
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 text-center flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    className="pl-10 w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:outline-none focus:border-transparent transition"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <a href="#" className="text-sm text-orange-600 hover:text-orange-800 font-medium transition">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="pl-10 w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:outline-none focus:border-transparent transition"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5" /> Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In <Rocket size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">

                        </div>
                    </div>



                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/signUp" className="text-orange-600 font-semibold hover:text-orange-800 transition">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}