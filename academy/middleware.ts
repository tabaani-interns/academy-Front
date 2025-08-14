// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {

    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("userRole")?.value;
    const path = req.nextUrl.pathname;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (
        path.startsWith("/addCourse") ||
        path.startsWith("/manageUsers") ||
        path.startsWith("/addCourse")
    ) {
        if (role !== "Admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }


    if (
        path.startsWith("/profile") ||
        path.startsWith("/")
    ) {
        if (role !== "User" && role !== "Admin") {

            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }


    return NextResponse.next();
}

export const config = {
    matcher: ["/addCourse", "/profile", "/lessonPage"], // match all nested routes
};

