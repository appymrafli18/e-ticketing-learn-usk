import { NextRequest } from "next/server";
import { createResponse } from "./lib/response";

export async function middleware(
  req: NextRequest
  // res: NextResponse,
) {
  const getToken = req.cookies.get("token")?.value;

  if (!getToken) {
    return createResponse(401, "Access Denied");
  }
  return null;
}

export const config = {
  matcher: ["/api/user/:path*"],
};
