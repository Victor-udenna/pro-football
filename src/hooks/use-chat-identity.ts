"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CHAT_USERNAME_STORAGE_KEY,
  CHAT_USER_ID_STORAGE_KEY,
} from "@/utils/config";
import { generateId } from "@/utils/id";

export function useChatIdentity() {
  const [userId, setUserId] = useState<string | null>(null);
  const [storedUsername, setStoredUsername] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let storedUserId = localStorage.getItem(CHAT_USER_ID_STORAGE_KEY);
    if (!storedUserId) {
      storedUserId = generateId();
      localStorage.setItem(CHAT_USER_ID_STORAGE_KEY, storedUserId);
    }
    // localStorage is unavailable during SSR, so identity must be hydrated
    // client-side after mount rather than derived during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserId(storedUserId);
    setStoredUsername(localStorage.getItem(CHAT_USERNAME_STORAGE_KEY));
    setIsReady(true);
  }, []);

  const setUsername = useCallback((name: string) => {
    const trimmed = name.trim().slice(0, 24);
    if (!trimmed) return;
    localStorage.setItem(CHAT_USERNAME_STORAGE_KEY, trimmed);
    setStoredUsername(trimmed);
  }, []);

  return { userId, username: storedUsername, setUsername, isReady };
}
