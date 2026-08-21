"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "@/hooks/use-socket";
import { generateId } from "@/utils/id";
import { CHAT_MESSAGE_MAX_LENGTH, TYPING_DEBOUNCE_MS } from "@/utils/config";
import type { ChatMessage, TypingUser } from "@/types/chat";
import type {
  ChatMessagePayload,
  ChatUserPayload,
  SocketErrorPayload,
  TypingIndicatorPayload,
} from "@/types/socket";

interface UseChatOptions {
  matchId: string;
  userId: string | null;
  username: string | null;
}

export function useChat({ matchId, userId, username }: UseChatOptions) {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [lastError, setLastError] = useState<string | null>(null);

  const isTypingRef = useRef(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canChat = Boolean(matchId && userId && username);

  useEffect(() => {
    if (!matchId || !userId || !username) return;

    function join() {
      socket.emit("join_chat", { matchId, userId: userId!, username: username! });
    }

    if (socket.connected) join();
    socket.on("connect", join);

    function handleChatMessage(payload: ChatMessagePayload) {
      if (payload.matchId !== matchId) return;
      setMessages((prev) => [
        ...prev,
        { id: generateId(), kind: "message", ...payload },
      ]);
    }

    function handleUserJoined(payload: ChatUserPayload) {
      if (payload.matchId !== matchId || payload.userId === userId) return;
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          kind: "system",
          matchId,
          userId: payload.userId,
          username: payload.username,
          message: `${payload.username} joined the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    function handleUserLeft(payload: ChatUserPayload) {
      if (payload.matchId !== matchId) return;
      setTypingUsers((prev) => prev.filter((user) => user.userId !== payload.userId));
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          kind: "system",
          matchId,
          userId: payload.userId,
          username: payload.username,
          message: `${payload.username} left the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    function handleTyping(payload: TypingIndicatorPayload) {
      if (payload.matchId !== matchId || payload.userId === userId) return;
      setTypingUsers((prev) => {
        const withoutUser = prev.filter((user) => user.userId !== payload.userId);
        return payload.isTyping
          ? [...withoutUser, { userId: payload.userId, username: payload.username }]
          : withoutUser;
      });
    }

    function handleError(payload: SocketErrorPayload) {
      setLastError(payload.message);
    }

    socket.on("chat_message", handleChatMessage);
    socket.on("user_joined", handleUserJoined);
    socket.on("user_left", handleUserLeft);
    socket.on("typing_indicator", handleTyping);
    socket.on("error", handleError);

    return () => {
      socket.emit("leave_chat", { matchId, userId: userId! });
      socket.off("connect", join);
      socket.off("chat_message", handleChatMessage);
      socket.off("user_joined", handleUserJoined);
      socket.off("user_left", handleUserLeft);
      socket.off("typing_indicator", handleTyping);
      socket.off("error", handleError);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      isTypingRef.current = false;
    };
  }, [matchId, userId, username, socket]);

  const stopTyping = useCallback(() => {
    if (isTypingRef.current && userId) {
      isTypingRef.current = false;
      socket.emit("typing_stop", { matchId, userId });
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }, [matchId, userId, socket]);

  const notifyTyping = useCallback(() => {
    if (!userId || !username) return;
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      socket.emit("typing_start", { matchId, userId, username });
    }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(stopTyping, TYPING_DEBOUNCE_MS);
  }, [matchId, userId, username, socket, stopTyping]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!userId || !username) return;
      const trimmed = text.trim().slice(0, CHAT_MESSAGE_MAX_LENGTH);
      if (!trimmed) return;
      socket.emit("send_message", { matchId, userId, username, message: trimmed });
      stopTyping();
    },
    [matchId, userId, username, socket, stopTyping]
  );

  return { messages, typingUsers, sendMessage, notifyTyping, canChat, lastError };
}
