import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // const sessionToken =
  //   req.cookies.get("__Secure-better-auth.session_token")?.value ||
  //   req.cookies.get("better-auth.session_token")?.value;

  const sessionToken = getSessionCookie(req);

  let userRole = null;

  if (sessionToken) {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/get-session`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${sessionToken}`,
      //       "Content-Type": "application/json",
      //     },
      //     cache: "no-store",
      //   },
      // );

      const response = await fetch(
        new URL("/api/auth/get-session", process.env.NEXT_PUBLIC_BACKEND_URL),
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
            "Content-Type": "application/json",
            Cookie: `better-auth.session_token=${sessionToken}; __Secure-better-auth.session_token=${sessionToken}`,
          },
          cache: "no-store",
        },
      );

      // console.log("Fetching session from backend with token:", response);
      // console.log("Response Headers:", response.headers);
      // console.log("Response :", response);
      if (response.ok) {
        const result = await response.json();
        // console.log("Full Result from Backend:", result);
        userRole = result?.user?.role || null;
      }
    } catch (error) {
      console.error("Session fetch failed", error);
    }
  }

  const isAdmin = userRole === "ADMIN";
  const isCustomer = userRole === "USER";
  const isProvider = userRole === "CREATOR";

  console.log("--- Debugging Middleware ---");
  console.log("Pathname:", pathname);
  console.log("Session Token Found:", !!sessionToken, sessionToken);
  console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
  console.log("User Role:", userRole);

  if (pathname.startsWith("/dashboard/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard/user") && !isCustomer) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard/provider") && !isProvider) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/admin/:path*",
    "/dashboard/provider/:path*",
    "/dashboard/user/:path*",
    "/dashboard/:path*",
  ],
};
