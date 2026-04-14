"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
      className="bg-base-200 px-4 text-center"
    >
      <h1 className="text-9xl font-bold text-primary animate-bounce">404</h1>

      <h2 className="text-3xl font-semibold mt-4">Page Not Found!</h2>

      <p className="text-gray-500 mt-2 mb-8 max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
        Please check the URL or return to safety.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => router.back()}
          className="btn btn-outline btn-primary px-8 hover:scale-105 transition-transform"
        >
          Go Back
        </button>

        <button
          onClick={() => router.push("/")}
          className="btn btn-primary px-8 hover:scale-105 transition-transform"
        >
          Back to Home
        </button>
      </div>

      <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-primary/20 rounded-full h-64 w-64 m-auto"></div>
    </div>
  );
}
