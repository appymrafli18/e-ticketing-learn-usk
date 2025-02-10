import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "./lib/response";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api")) {
    const getToken = req.cookies.get("token")?.value;
    if (!getToken) return createResponse(401, "Access Denied");
    return null;
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const getToken = req.cookies.get("token")?.value;
    if (!getToken) return NextResponse.redirect(new URL("/login", req.url));
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(getToken, secret);

    if (payload.role !== "ADMIN")
      return NextResponse.redirect(new URL("/", req.url));
    return null;
  }

  if (req.nextUrl.pathname.startsWith("/login")) {
    const getToken = req.cookies.get("token")?.value;
    if (getToken) return NextResponse.redirect(new URL("/dashboard", req.url));
    return null;
  }

  return null;
}

export const config = {
  matcher: ["/api/user/:path*", "/dashboard/:path*", "/login"],
};
