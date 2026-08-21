import type { MatchEvent, MatchStatistics, MatchStatus } from "@/types/match";

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected";

export interface ScoreUpdatePayload {
  matchId: string;
  homeScore: number;
  awayScore: number;
}

export interface MatchEventPayload extends MatchEvent {
  matchId: string;
}

export interface StatsUpdatePayload {
  matchId: string;
  statistics: MatchStatistics;
}

export interface StatusChangePayload {
  matchId: string;
  status: MatchStatus;
  minute: number;
}

export interface ChatMessagePayload {
  matchId: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
}

export interface ChatUserPayload {
  matchId: string;
  userId: string;
  username: string;
}

export interface TypingIndicatorPayload {
  matchId: string;
  userId: string;
  username: string;
  isTyping: boolean;
}

export interface SocketErrorPayload {
  code: string;
  message: string;
}

export interface ServerToClientEvents {
  score_update: (payload: ScoreUpdatePayload) => void;
  match_event: (payload: MatchEventPayload) => void;
  stats_update: (payload: StatsUpdatePayload) => void;
  status_change: (payload: StatusChangePayload) => void;
  chat_message: (payload: ChatMessagePayload) => void;
  user_joined: (payload: ChatUserPayload) => void;
  user_left: (payload: ChatUserPayload) => void;
  typing_indicator: (payload: TypingIndicatorPayload) => void;
  error: (payload: SocketErrorPayload) => void;
}

export interface ClientToServerEvents {
  subscribe_match: (payload: { matchId: string }) => void;
  unsubscribe_match: (payload: { matchId: string }) => void;
  join_chat: (payload: {
    matchId: string;
    userId: string;
    username: string;
  }) => void;
  leave_chat: (payload: { matchId: string; userId: string }) => void;
  send_message: (payload: {
    matchId: string;
    userId: string;
    username: string;
    message: string;
  }) => void;
  typing_start: (payload: {
    matchId: string;
    userId: string;
    username: string;
  }) => void;
  typing_stop: (payload: { matchId: string; userId: string }) => void;
}
