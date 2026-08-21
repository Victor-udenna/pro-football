import type { MatchEventType, MatchStatus } from "@/types/match";

export function isMatchLive(status: MatchStatus): boolean {
  return status === "FIRST_HALF" || status === "SECOND_HALF" || status === "HALF_TIME";
}

export function isMatchUpcoming(status: MatchStatus): boolean {
  return status === "NOT_STARTED";
}

export function isMatchFinished(status: MatchStatus): boolean {
  return status === "FULL_TIME";
}

const STATUS_LABELS: Record<MatchStatus, string> = {
  NOT_STARTED: "Upcoming",
  FIRST_HALF: "1st Half",
  HALF_TIME: "Half-Time",
  SECOND_HALF: "2nd Half",
  FULL_TIME: "Full-Time",
};

export function formatMatchStatus(status: MatchStatus): string {
  return STATUS_LABELS[status];
}

export function formatMatchMinute(status: MatchStatus, minute: number): string {
  if (status === "NOT_STARTED") return "--";
  if (status === "HALF_TIME") return "HT";
  if (status === "FULL_TIME") return "FT";
  return `${minute}'`;
}

export function formatKickoffTime(startTime: string): string {
  return new Date(startTime).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const EVENT_LABELS: Record<MatchEventType, string> = {
  GOAL: "Goal",
  YELLOW_CARD: "Yellow Card",
  RED_CARD: "Red Card",
  SUBSTITUTION: "Substitution",
  FOUL: "Foul",
  SHOT: "Shot",
};

export function formatEventType(type: MatchEventType): string {
  return EVENT_LABELS[type];
}

const STATUS_SORT_RANK: Record<MatchStatus, number> = {
  FIRST_HALF: 0,
  HALF_TIME: 0,
  SECOND_HALF: 0,
  NOT_STARTED: 1,
  FULL_TIME: 2,
};

export function compareMatchesByStatus(
  a: { status: MatchStatus },
  b: { status: MatchStatus }
): number {
  return STATUS_SORT_RANK[a.status] - STATUS_SORT_RANK[b.status];
}
