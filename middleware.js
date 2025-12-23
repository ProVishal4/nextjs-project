import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    //const token = req.getToken("token")?.value;
     const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    //const { pathname } = req.nextUrl;
    const path = req.nextUrl.pathname;
   
    if (!token && path.startsWith("/dashboard")
    ) {
        return NextResponse.redirect(new URL("/login", req.url));
    }



    return NextResponse.next();


}
export const config = {
    matcher: ["/dashboard/:path*"]
}