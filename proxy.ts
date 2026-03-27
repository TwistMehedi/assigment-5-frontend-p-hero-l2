import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionToken =
    req.cookies.get("better-auth.session_token")?.value ||
    req.cookies.get("__Secure-better-auth.session_token")?.value;

  let userRole = null;

  if (sessionToken) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_HOST_URL}/api/v1/auth/get-session`,
        {
          headers: { cookie: req.headers.get("cookie") || "" },
        },
      );

      if (response.ok) {
        const result = await response.json();
        userRole = result?.data?.user?.role || null;
      }
    } catch (error) {
      console.error("Session fetch failed", error);
    }
  }

  // console.log("userRole", userRole);
  const isAdmin = userRole === "ADMIN";
  const isCustomer = userRole === "USER";
  const isProvider = userRole === "CREATOR";

  if (isAdmin) return NextResponse.next();

  if (pathname.startsWith("/dashboard/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard/user") && !isCustomer) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard/provider") && !isProvider) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!sessionToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/provider/:path*",
    "/dashboard/user/:path*",
    "/login",
  ],
};
