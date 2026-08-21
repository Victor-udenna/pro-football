import type {
  MatchStatistics as MatchStatisticsData,
  Team,
} from "@/types/match";

interface StatRowData {
  label: string;
  home: number;
  away: number;
  isPercentage?: boolean;
}

export function MatchStatistics({
  statistics,
  homeTeam,
  awayTeam,
}: Readonly<{
  statistics: MatchStatisticsData;
  homeTeam: Team;
  awayTeam: Team;
}>) {
  const rows: StatRowData[] = [
    {
      label: "Possession",
      home: statistics.possession.home,
      away: statistics.possession.away,
      isPercentage: true,
    },
    {
      label: "Shots",
      home: statistics.shots.home,
      away: statistics.shots.away,
    },
    {
      label: "Shots on Target",
      home: statistics.shotsOnTarget.home,
      away: statistics.shotsOnTarget.away,
    },
    {
      label: "Corners",
      home: statistics.corners.home,
      away: statistics.corners.away,
    },
    {
      label: "Fouls",
      home: statistics.fouls.home,
      away: statistics.fouls.away,
    },
    {
      label: "Yellow Cards",
      home: statistics.yellowCards.home,
      away: statistics.yellowCards.away,
    },
    {
      label: "Red Cards",
      home: statistics.redCards.home,
      away: statistics.redCards.away,
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>{homeTeam.shortName}</span>
        <span>{awayTeam.shortName}</span>
      </div>
      {rows.map((row) => (
        <StatBar key={row.label} {...row} />
      ))}
    </div>
  );
}

function StatBar({ label, home, away, isPercentage }: Readonly<StatRowData>) {
  const total = home + away;
  const homePct = total === 0 ? 50 : (home / total) * 100;
  const awayPct = 100 - homePct;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm font-semibold tabular-nums">
        <span>
          {home}
          {isPercentage ? "%" : ""}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span>
          {away}
          {isPercentage ? "%" : ""}
        </span>
      </div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="bg-primary transition-all"
          style={{ width: `${homePct}%` }}
        />
        <div
          className="bg-primary/25 transition-all"
          style={{ width: `${awayPct}%` }}
        />
      </div>
    </div>
  );
}
