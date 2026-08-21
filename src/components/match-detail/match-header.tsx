import { StatusBadge } from "@/components/matches/status-badge";
import { cn } from "@/lib/utils";
import { formatKickoffTime, formatMatchMinute } from "@/utils/match";
import { DISPLAY_TEXT_CLASS } from "@/utils/typography";
import type { MatchDetail } from "@/types/match";

export function MatchHeader({ match }: Readonly<{ match: MatchDetail }>) {
  const showKickoff = match.status === "NOT_STARTED";

  return (
    <div className="rounded-xl border bg-card p-6 ring-1 ring-foreground/10">
      <div className="mb-6 flex items-center justify-between">
        <StatusBadge status={match.status} />
        <span className={cn(DISPLAY_TEXT_CLASS, "text-sm text-muted-foreground tabular-nums")}>
          {showKickoff
            ? `Kicks off ${formatKickoffTime(match.startTime)}`
            : formatMatchMinute(match.status, match.minute)}
        </span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
        <TeamBlock
          name={match.homeTeam.name}
          shortName={match.homeTeam.shortName}
          align="right"
        />
        <div
          className={cn(
            DISPLAY_TEXT_CLASS,
            "flex items-center gap-2.5 text-3xl tabular-nums sm:gap-4 sm:text-4xl"
          )}
        >
          <span>{match.homeScore}</span>
          <span className="text-muted-foreground">–</span>
          <span>{match.awayScore}</span>
        </div>
        <TeamBlock
          name={match.awayTeam.name}
          shortName={match.awayTeam.shortName}
          align="left"
        />
      </div>
    </div>
  );
}

function TeamBlock({
  name,
  shortName,
  align,
}: Readonly<{
  name: string;
  shortName: string;
  align: "left" | "right";
}>) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 text-center",
        align === "right" ? "sm:flex-row-reverse sm:text-right" : "sm:flex-row sm:text-left"
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground sm:size-11 sm:text-sm">
        {shortName}
      </span>
      <span className="text-xs font-medium sm:text-base">{name}</span>
    </div>
  );
}
