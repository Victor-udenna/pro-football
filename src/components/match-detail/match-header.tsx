import { cn } from "@/lib/utils";
import { formatKickoffTime, formatMatchMinute, formatMatchStatus, isMatchLive } from "@/utils/match";
import { DISPLAY_TEXT_CLASS } from "@/utils/typography";
import { LiveIndicator } from "@/components/matches/live-indicator";
import type { MatchDetail } from "@/types/match";

export function MatchHeader({ match }: Readonly<{ match: MatchDetail }>) {
  const showKickoff = match.status === "NOT_STARTED";
  const live = isMatchLive(match.status);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <span
          className={cn(
            DISPLAY_TEXT_CLASS,
            "flex items-center gap-1.5 text-sm",
            live ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {live && <LiveIndicator />}
          {formatMatchStatus(match.status)}
        </span>
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
        "flex flex-col items-center gap-1 text-center",
        align === "right" ? "sm:items-end sm:text-right" : "sm:items-start sm:text-left"
      )}
    >
      <span className={cn(DISPLAY_TEXT_CLASS, "text-[11px] text-muted-foreground")}>
        {shortName}
      </span>
      <span className="text-sm font-semibold text-foreground sm:text-base">{name}</span>
    </div>
  );
}
