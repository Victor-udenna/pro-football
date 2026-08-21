"use client";

import { useQuery } from "@tanstack/react-query";
import { getMatchById } from "@/services/api";
import { isMatchFinished } from "@/utils/match";

export function matchQueryKey(matchId: string) {
  return ["match", matchId] as const;
}

export function useMatch(matchId: string) {
  return useQuery({
    queryKey: matchQueryKey(matchId),
    queryFn: () => getMatchById(matchId),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data && isMatchFinished(data.status)) return false;
      return 20_000;
    },
  });
}
