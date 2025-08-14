// pages/404.tsx or app/not-found.tsx

import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-orange-200 via-orange-300 to-orange-400 px-6">
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 animate-pulse mb-6">
                404
            </h1>
            <h2 className="text-4xl font-semibold text-orange-900 mb-4">
                Oops! Page Not Found
            </h2>
            <p className="text-lg text-orange-800 mb-8 max-w-md text-center">
                The page you are looking for does not exist or has been moved.
                Please check the URL or return to the homepage.
            </p>
            <Link
                href="/"
                className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg shadow-lg font-semibold text-lg transition-transform transform hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
                Back to Home
            </Link>
        </div>
    );
}
