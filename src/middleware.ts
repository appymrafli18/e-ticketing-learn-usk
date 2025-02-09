import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "./lib/response";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api")) {
    const getToken = req.cookies.get("token")?.value;
    if (!getToken) return createResponse(401, "Access Denied");
    return null;
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const getToken = req.cookies.get("token")?.value;
    if (!getToken) return NextResponse.redirect(new URL("/login", req.url));
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
