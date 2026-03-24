import { ThemeProvider } from "@/components/Navbar/theme-provider";
import ReduxProvider from "@/components/ReduxProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {/* ThemeProvider সবসময় সবার উপরে থাকবে */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* ReduxProvider তার ভেতরে থাকবে */}
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}