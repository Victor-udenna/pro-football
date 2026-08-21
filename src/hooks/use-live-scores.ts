"use client";

import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/hooks/use-socket";
import { matchesQueryKey, useMatches } from "@/hooks/use-matches";
import type { Match } from "@/types/match";
import type { ScoreUpdatePayload, StatusChangePayload } from "@/types/socket";

export function useLiveScores() {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const { data: matches } = useMatches();

  const idsKey = useMemo(
    () => (matches ?? []).map((match) => match.id).sort().join(","),
    [matches]
  );

  useEffect(() => {
    const matchIds = idsKey ? idsKey.split(",") : [];
    if (matchIds.length === 0) return;

    matchIds.forEach((matchId) => socket.emit("subscribe_match", { matchId }));

    function handleScoreUpdate(payload: ScoreUpdatePayload) {
      queryClient.setQueryData<Match[]>(matchesQueryKey, (old) =>
        old?.map((match) =>
          match.id === payload.matchId
            ? { ...match, homeScore: payload.homeScore, awayScore: payload.awayScore }
            : match
        )
      );
    }

    function handleStatusChange(payload: StatusChangePayload) {
      queryClient.setQueryData<Match[]>(matchesQueryKey, (old) =>
        old?.map((match) =>
          match.id === payload.matchId
            ? { ...match, status: payload.status, minute: payload.minute }
            : match
        )
      );
    }

    socket.on("score_update", handleScoreUpdate);
    socket.on("status_change", handleStatusChange);

    return () => {
      matchIds.forEach((matchId) =>
        socket.emit("unsubscribe_match", { matchId })
      );
      socket.off("score_update", handleScoreUpdate);
      socket.off("status_change", handleStatusChange);
    };
  }, [idsKey, socket, queryClient]);
}
