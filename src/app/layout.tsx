import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/Header";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

export const metadata: Metadata = {
  title: "Fantasy Stocks - Stock Trading Game",
  description: "Join groups, pick stocks, compete with friends!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="fantasy-stocks-theme">
            <div className="app-container">
              <Header />
                <CopilotKit runtimeUrl="/api/copilotkit">
                
              <main className="main-wrapper">{children}</main>
                </CopilotKit>
              <Toaster />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
