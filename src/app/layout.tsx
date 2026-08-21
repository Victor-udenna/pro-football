import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { THEME_STORAGE_KEY } from "@/utils/config";

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var isDark = stored === "dark" || (stored !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProFootball Live Match Center",
  description: "Real-time football scores, match events, stats, and chat.",
  icons: {
    icon: "/favicon-180.png",
    apple: "/favicon-180.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${oswald.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
      </head>
      <body className="flex min-h-full flex-col bg-muted">
        <ThemeProvider>
          <QueryProvider>
            <SocketProvider>
              <SiteHeader />
              <main className="flex flex-1 flex-col">{children}</main>
            </SocketProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
