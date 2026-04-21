import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL: "http://localhost:5000",
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
  //   ? process.env.NEXT_PUBLIC_BACKEND_URL
  //   : "/api/auth",
  baseURL: process.env.NEXT_PUBLIC_CLIENT_URL
    ? process.env.NEXT_PUBLIC_CLIENT_URL
    : "/api/auth",

  fetchOptions: { credentials: "include" },

  // plugins: [
  //   {
  //     id: "next-cookies-request",
  //     fetchPlugins: [
  //       {
  //         id: "next-cookies-request-plugin",
  //         name: "next-cookies-request-plugin",
  //         hooks: {
  //           async onRequest(ctx) {
  //             if (typeof window === "undefined") {
  //               const { cookies } = await import("next/headers");
  //               const headers = await cookies();
  //               console.log("headers", headers);
  //               ctx.headers.set("cookie", headers.toString());
  //             }
  //           },
  //         },
  //       },
  //     ],
  //   },
  // ],
});

export type Session = typeof authClient.$Infer.Session & {
  user: {
    role: string;
    status: string;
  };
};

// export type ActiveSession = typeof authClient.$Infer.Session;
