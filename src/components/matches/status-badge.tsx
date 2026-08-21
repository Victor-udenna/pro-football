import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatMatchStatus, isMatchLive, isMatchUpcoming } from "@/utils/match";
import { DISPLAY_TEXT_CLASS } from "@/utils/typography";
import type { MatchStatus } from "@/types/match";

export function StatusBadge({
  status,
  className,
}: Readonly<{
  status: MatchStatus;
  className?: string;
}>) {
  const live = isMatchLive(status);
  const upcoming = isMatchUpcoming(status);

  let variant: "destructive" | "outline" | "secondary" = "secondary";
  if (live) variant = "destructive";
  else if (upcoming) variant = "outline";

  return (
    <Badge
      variant={variant}
      className={cn(DISPLAY_TEXT_CLASS, "gap-1.5 tracking-[0.14em]", className)}
    >
      {live && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-destructive" />
        </span>
      )}
      {formatMatchStatus(status)}
    </Badge>
  );
}
