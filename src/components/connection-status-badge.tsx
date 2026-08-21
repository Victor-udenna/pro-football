"use client";

import { cn } from "@/lib/utils";
import { useConnectionStatus } from "@/hooks/use-connection-status";
import type { ConnectionStatus } from "@/types/socket";

const STATUS_CONFIG: Record<
  ConnectionStatus,
  { label: string; dot: string; text: string }
> = {
  connected: {
    label: "Live",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  connecting: {
    label: "Connecting",
    dot: "bg-amber-500 animate-pulse",
    text: "text-amber-600 dark:text-amber-400",
  },
  reconnecting: {
    label: "Reconnecting",
    dot: "bg-amber-500 animate-pulse",
    text: "text-amber-600 dark:text-amber-400",
  },
  disconnected: {
    label: "Offline",
    dot: "bg-destructive",
    text: "text-destructive",
  },
};

export function ConnectionStatusBadge({ className }: { className?: string }) {
  const status = useConnectionStatus();
  const config = STATUS_CONFIG[status];

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", config.dot)} />
      <span className={config.text}>{config.label}</span>
    </div>
  );
}
