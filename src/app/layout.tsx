import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { SiteHeader } from "@/components/layout/site-header";

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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-muted/30">
        <QueryProvider>
          <SocketProvider>
            <SiteHeader />
            <main className="flex flex-1 flex-col">{children}</main>
          </SocketProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
