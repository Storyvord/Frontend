// src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const restrictedCrewPaths = ["/crew", "/crew/home"];
const restrictedClientPaths = ["/dashboard", "/dashboard/home", "/project-details"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("accessToken")?.value;
  const isClient = request.cookies.get("isClient")?.value;

  // Prevent clients from accessing crew sections
  const isRestrictedCrewPath = restrictedCrewPaths.some((crewPath) => path.startsWith(crewPath));
  // Prevent crew from accessing client sections including project-details
  const isRestrictedClientPath = restrictedClientPaths.some((clientPath) => {
    return path.startsWith(clientPath);
  });
  if (!token) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next(); // Allow access to the "/" route
    }
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    // return NextResponse.next();
  } else if (isClient === "true") {
    if (isRestrictedCrewPath) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else if (isClient === "false") {
    if (isRestrictedClientPath) {
      return NextResponse.redirect(new URL("/crew/home", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/crew/:path*", "/project-details/:path*"],
};
