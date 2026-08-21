"use client";

import { useSocket } from "@/hooks/use-socket";

export function useConnectionStatus() {
  const { status } = useSocket();
  return status;
}
