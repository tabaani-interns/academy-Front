import React from "react";
import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 px-4">
            <h1 className="text-6xl font-bold text-yellow-600 mb-4">⚠️</h1>
            <h2 className="text-3xl font-semibold mb-2">Access Denied</h2>
            <p className="text-yellow-700 mb-6 max-w-md text-center">
                You do not have permission to view this page. Please contact your administrator or log in with the appropriate account.
            </p>
            
        </div>
    );
}
