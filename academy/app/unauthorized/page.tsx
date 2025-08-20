"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-600">
            Access Denied
          </CardTitle>
          <p className="text-gray-600">
            You don't have permission to access this page
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <svg
              className="mx-auto h-16 w-16 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <p className="text-sm text-gray-500 text-center">
            You need appropriate permissions to access this resource. Please
            contact an administrator if you believe this is an error.
          </p>

          <div className="flex space-x-2">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex-1"
            >
              Go Back
            </Button>
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full">Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
