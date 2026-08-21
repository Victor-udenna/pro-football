"use client";

import { useMemo } from "react";
import { ShieldIcon } from "lucide-react";
import { useMatches } from "@/hooks/use-matches";
import { useLiveScores } from "@/hooks/use-live-scores";
import { MatchCard } from "@/components/matches/match-card";
import { LoadingState } from "@/components/state/loading-state";
import { ErrorState } from "@/components/state/error-state";
import { EmptyState } from "@/components/state/empty-state";
import { compareMatchesByStatus } from "@/utils/match";

export function MatchList() {
  const { data: matches, isPending, isError, refetch } = useMatches();
  useLiveScores();

  const sortedMatches = useMemo(
    () => [...(matches ?? [])].sort(compareMatchesByStatus),
    [matches]
  );

  if (isPending) {
    return <LoadingState label="Loading matches…" />;
  }

  if (isError) {
    return (
      <ErrorState
        description="We couldn't reach the match feed. Check your connection and try again."
        onRetry={() => refetch()}
      />
    );
  }

  if (sortedMatches.length === 0) {
    return (
      <EmptyState
        icon={ShieldIcon}
        title="No matches right now"
        description="New fixtures kick off automatically — check back shortly."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {sortedMatches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}
