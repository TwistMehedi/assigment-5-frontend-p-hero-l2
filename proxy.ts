import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionToken =
    req.cookies.get("better-auth.session_token")?.value ||
    req.cookies.get("__Secure-better-auth.session_token")?.value;

  if (!sessionToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let userRole = null;

  if (sessionToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/get-session`,
        {
          headers: { cookie: req.headers.get("cookie") || "" },
          cache: "no-store",
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

  if (pathname.startsWith("/dashboard") && !userRole) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/dashboard/provider/:path*",
    "/dashboard/user/:path*",
    "/dashboard/:path*",
  ],
};
