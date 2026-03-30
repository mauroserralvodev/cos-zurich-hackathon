import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "collective_demo_access";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedRoute = pathname.startsWith("/dash");
  const hasAccess = req.cookies.get(COOKIE_NAME)?.value === "granted";

  if (isProtectedRoute && !hasAccess) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dash/:path*"],
};