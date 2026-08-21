"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/hooks/use-socket";
import { matchQueryKey } from "@/hooks/use-match";
import { matchesQueryKey } from "@/hooks/use-matches";
import type { Match, MatchDetail, MatchEvent } from "@/types/match";
import type {
  MatchEventPayload,
  ScoreUpdatePayload,
  StatsUpdatePayload,
  StatusChangePayload,
} from "@/types/socket";

export function useMatchLiveUpdates(matchId: string) {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!matchId) return;

    socket.emit("subscribe_match", { matchId });

    function patchList(patch: Partial<Match>) {
      queryClient.setQueryData<Match[]>(matchesQueryKey, (old) =>
        old?.map((match) =>
          match.id === matchId ? { ...match, ...patch } : match
        )
      );
    }

    function handleScoreUpdate(payload: ScoreUpdatePayload) {
      if (payload.matchId !== matchId) return;
      queryClient.setQueryData<MatchDetail>(matchQueryKey(matchId), (old) =>
        old
          ? { ...old, homeScore: payload.homeScore, awayScore: payload.awayScore }
          : old
      );
      patchList({ homeScore: payload.homeScore, awayScore: payload.awayScore });
    }

    function handleMatchEvent(payload: MatchEventPayload) {
      if (payload.matchId !== matchId) return;
      queryClient.setQueryData<MatchDetail>(matchQueryKey(matchId), (old) => {
        if (!old) return old;
        if (old.events.some((event) => event.id === payload.id)) return old;
        const event: MatchEvent = {
          id: payload.id,
          type: payload.type,
          minute: payload.minute,
          team: payload.team,
          player: payload.player,
          assistPlayer: payload.assistPlayer,
          description: payload.description,
          timestamp: payload.timestamp,
        };
        return { ...old, events: [event, ...old.events] };
      });
    }

    function handleStatsUpdate(payload: StatsUpdatePayload) {
      if (payload.matchId !== matchId) return;
      queryClient.setQueryData<MatchDetail>(matchQueryKey(matchId), (old) =>
        old ? { ...old, statistics: payload.statistics } : old
      );
    }

    function handleStatusChange(payload: StatusChangePayload) {
      if (payload.matchId !== matchId) return;
      queryClient.setQueryData<MatchDetail>(matchQueryKey(matchId), (old) =>
        old ? { ...old, status: payload.status, minute: payload.minute } : old
      );
      patchList({ status: payload.status, minute: payload.minute });
    }

    socket.on("score_update", handleScoreUpdate);
    socket.on("match_event", handleMatchEvent);
    socket.on("stats_update", handleStatsUpdate);
    socket.on("status_change", handleStatusChange);

    return () => {
      socket.emit("unsubscribe_match", { matchId });
      socket.off("score_update", handleScoreUpdate);
      socket.off("match_event", handleMatchEvent);
      socket.off("stats_update", handleStatsUpdate);
      socket.off("status_change", handleStatusChange);
    };
  }, [matchId, socket, queryClient]);
}
