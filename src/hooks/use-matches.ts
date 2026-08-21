"use client";

import { useQuery } from "@tanstack/react-query";
import { getMatches } from "@/services/api";

export const matchesQueryKey = ["matches"] as const;

export function useMatches() {
  return useQuery({
    queryKey: matchesQueryKey,
    queryFn: async () => (await getMatches()).matches,
    refetchInterval: 20_000,
  });
}
