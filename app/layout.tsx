import { ThemeProvider } from "@/components/Navbar/theme-provider";
import ReduxProvider from "@/components/ReduxProvider";
import FloatingChatBot from "@/components/shared/FloatingChatBot";

import { ToastContainer } from "react-toastify";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans min-h-screen bg-background text-foreground antialiased`}
      >
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
            <FloatingChatBot />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
