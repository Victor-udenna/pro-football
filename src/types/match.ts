export type MatchStatus =
  | "NOT_STARTED"
  | "FIRST_HALF"
  | "HALF_TIME"
  | "SECOND_HALF"
  | "FULL_TIME";

export type MatchEventType =
  | "GOAL"
  | "YELLOW_CARD"
  | "RED_CARD"
  | "SUBSTITUTION"
  | "FOUL"
  | "SHOT";

export type MatchSide = "home" | "away";

export interface Team {
  id: string;
  name: string;
  shortName: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  minute: number;
  status: MatchStatus;
  startTime: string;
}

export interface MatchEvent {
  id: string;
  type: MatchEventType;
  minute: number;
  team: MatchSide;
  player: string;
  assistPlayer?: string;
  description: string;
  timestamp: string;
}

export interface MatchStatComparison {
  home: number;
  away: number;
}

export interface MatchStatistics {
  possession: MatchStatComparison;
  shots: MatchStatComparison;
  shotsOnTarget: MatchStatComparison;
  corners: MatchStatComparison;
  fouls: MatchStatComparison;
  yellowCards: MatchStatComparison;
  redCards: MatchStatComparison;
}

export interface MatchDetail extends Match {
  events: MatchEvent[];
  statistics: MatchStatistics;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface MatchesResponse {
  matches: Match[];
  total: number;
}
