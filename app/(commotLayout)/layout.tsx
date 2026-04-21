"use client";

import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { withAdmin } from "@/components/shared/WithAdmin";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

// export default withAdmin(RootLayout);
export default RootLayout;
