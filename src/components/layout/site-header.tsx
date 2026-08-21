import Link from "next/link";
import { TrophyIcon } from "lucide-react";
import { ConnectionStatusBadge } from "@/components/connection-status-badge";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <TrophyIcon className="size-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            ProFootball <span className="text-muted-foreground">Live</span>
          </span>
        </Link>
        <ConnectionStatusBadge />
      </div>
    </header>
  );
}
