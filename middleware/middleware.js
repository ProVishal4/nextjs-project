// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//     const session = await authOptions();

//     const protectedPaths = ["/dashboard", "/profile", "/admin"];

//     const isProtected = protectedPaths.some((path) =>
//         req.nextUrl.pathname.startsWith(path)
//     );

//     if (isProtected && !session) {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }

//     return NextResponse.next();
// }

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const { pathname } = req.nextUrl;

    // ✅ Public routes (no auth needed)
    if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/register") ||
        pathname.startsWith("/api/auth")
    ) {
        return NextResponse.next();
    }

    // 🔒 Protected routes
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}
