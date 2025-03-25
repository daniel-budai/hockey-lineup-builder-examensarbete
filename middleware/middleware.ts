import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/lineups", "/teams", "/profile"];
  const isPathProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isPathProtected) {
    const token = await getToken({ req: request });

    if (!token) {
      const url = new URL(`/login`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/lineups/:path*",
    "/teams/:path*",
    "/profile/:path*",
  ],
};
