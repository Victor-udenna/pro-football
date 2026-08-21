export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://profootball.srv883830.hstgr.cloud";

export const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ??
  "https://profootball.srv883830.hstgr.cloud";

export const CHAT_USERNAME_STORAGE_KEY = "profootball:chat-username";
export const CHAT_USER_ID_STORAGE_KEY = "profootball:chat-user-id";
export const CHAT_MESSAGE_MAX_LENGTH = 500;
export const TYPING_DEBOUNCE_MS = 2000;
