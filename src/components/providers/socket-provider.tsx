"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { getSocket, type AppSocket } from "@/services/socket";
import type { ConnectionStatus } from "@/types/socket";

interface SocketContextValue {
  socket: AppSocket;
  status: ConnectionStatus;
}

export const SocketContext = createContext<SocketContextValue | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socket = useMemo(() => getSocket(), []);
  const [status, setStatus] = useState<ConnectionStatus>(() =>
    socket.connected ? "connected" : "connecting"
  );

  useEffect(() => {
    function handleConnect() {
      setStatus("connected");
    }
    function handleDisconnect() {
      setStatus("disconnected");
    }
    function handleReconnectAttempt() {
      setStatus("reconnecting");
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.io.on("reconnect_attempt", handleReconnectAttempt);
    socket.io.on("reconnect", handleConnect);

    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.io.off("reconnect_attempt", handleReconnectAttempt);
      socket.io.off("reconnect", handleConnect);
    };
  }, [socket]);

  const value = useMemo(() => ({ socket, status }), [socket, status]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
