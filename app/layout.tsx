import { ThemeProvider } from "@/components/Navbar/theme-provider";
import ReduxProvider from "@/components/ReduxProvider";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
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
