import { ThemeProvider } from "@/components/Navbar/theme-provider";
import ReduxProvider from "@/components/ReduxProvider";
// import { AuthProvider } from "@/components/shared/AuthProvider";
// import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
        className={`font-sans min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            {/* <AuthProvider>{children}</AuthProvider> */}
            {children}
            <ToastContainer
              theme="dark"
              position="top-center"
              autoClose={3000}
            />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
