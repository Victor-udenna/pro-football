import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatMatchMinute, formatMatchStatus, isMatchLive } from "@/utils/match";
import { DISPLAY_TEXT_CLASS } from "@/utils/typography";
import { LiveIndicator } from "@/components/shared/matches/live-indicator";
import type { Match } from "@/types/match";

export function MatchRow({ match }: Readonly<{ match: Match }>) {
  const live = isMatchLive(match.status);

  return (
    <Link
      href={`/matches/${match.id}`}
      className="group -mx-4 grid grid-cols-[4.5rem_2.5rem_1fr_auto_auto] grid-rows-2 items-center gap-x-4 gap-y-2 px-4 py-5 transition-colors hover:bg-foreground/6 focus:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:-mx-6 sm:grid-cols-[5.5rem_3rem_1fr_auto_auto] sm:gap-x-6 sm:px-6"
    >
      <span
        className={cn(
          DISPLAY_TEXT_CLASS,
          "row-start-1 col-start-1 flex items-center gap-1.5 text-sm tabular-nums whitespace-nowrap",
          live ? "text-destructive" : "text-foreground"
        )}
      >
        {live && <LiveIndicator />}
        {formatMatchMinute(match.status, match.minute)}
      </span>
      <span
        className={cn(
          DISPLAY_TEXT_CLASS,
          "row-start-2 col-start-1 whitespace-nowrap text-[11px] text-muted-foreground"
        )}
      >
        {formatMatchStatus(match.status)}
      </span>

      <span
        className={cn(
          DISPLAY_TEXT_CLASS,
          "row-start-1 col-start-2 text-xs text-muted-foreground"
        )}
      >
        {match.homeTeam.shortName}
      </span>
      <span
        className={cn(
          DISPLAY_TEXT_CLASS,
          "row-start-2 col-start-2 text-xs text-muted-foreground"
        )}
      >
        {match.awayTeam.shortName}
      </span>

      <span className="row-start-1 col-start-3 min-w-0 truncate text-base font-semibold text-foreground">
        {match.homeTeam.name}
      </span>
      <span className="row-start-2 col-start-3 min-w-0 truncate text-base font-semibold text-foreground">
        {match.awayTeam.name}
      </span>

      <span
        className={cn(
          DISPLAY_TEXT_CLASS,
          "row-start-1 col-start-4 text-right text-2xl tabular-nums text-foreground"
        )}
      >
        {match.homeScore}
      </span>
      <span
        className={cn(
          DISPLAY_TEXT_CLASS,
          "row-start-2 col-start-4 text-right text-2xl tabular-nums text-foreground"
        )}
      >
        {match.awayScore}
      </span>

      <ChevronRightIcon className="row-span-2 col-start-5 size-4 shrink-0 self-center text-muted-foreground/50 transition-colors group-hover:text-foreground" />
    </Link>
  );
}
