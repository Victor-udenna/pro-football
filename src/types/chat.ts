export interface ChatMessage {
  id: string;
  matchId: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
  kind: "message" | "system";
}

export interface TypingUser {
  userId: string;
  username: string;
}

export interface ChatIdentity {
  userId: string;
  username: string;
}
