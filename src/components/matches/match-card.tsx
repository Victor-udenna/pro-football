import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/matches/status-badge";
import { cn } from "@/lib/utils";
import { formatMatchMinute, isMatchLive } from "@/utils/match";
import { DISPLAY_TEXT_CLASS } from "@/utils/typography";
import type { Match } from "@/types/match";

export function MatchCard({ match }: { match: Match }) {
  const live = isMatchLive(match.status);

  return (
    <Link
      href={`/matches/${match.id}`}
      className="block rounded-xl focus:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card
        className={cn(
          "h-full transition-colors hover:ring-foreground/20",
          live && "ring-destructive/25"
        )}
      >
        <CardHeader className="flex-row items-center justify-between px-4">
          <StatusBadge status={match.status} />
          <span
            className={cn(DISPLAY_TEXT_CLASS, "text-xs text-muted-foreground tabular-nums")}
          >
            {formatMatchMinute(match.status, match.minute)}
          </span>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-4">
          <TeamRow
            shortName={match.homeTeam.shortName}
            name={match.homeTeam.name}
            score={match.homeScore}
          />
          <TeamRow
            shortName={match.awayTeam.shortName}
            name={match.awayTeam.name}
            score={match.awayScore}
          />
        </CardContent>
      </Card>
    </Link>
  );
}

function TeamRow({
  shortName,
  name,
  score,
}: {
  shortName: string;
  name: string;
  score: number;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">
          {shortName}
        </span>
        <span className="truncate text-sm font-medium">{name}</span>
      </div>
      <span className={cn(DISPLAY_TEXT_CLASS, "text-lg tabular-nums")}>{score}</span>
    </div>
  );
}
