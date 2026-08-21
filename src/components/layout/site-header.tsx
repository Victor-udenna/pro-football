import Link from "next/link";
import Image from "next/image";
import { ConnectionStatusBadge } from "@/components/shared/connection-status-badge";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-primary.png"
            alt="ProFootball"
            width={171}
            height={66}
            priority
            className="h-8 w-auto dark:invert"
          />
        </Link>
        <div className="flex items-center gap-2">
          <ConnectionStatusBadge />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
