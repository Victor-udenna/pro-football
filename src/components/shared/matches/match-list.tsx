"use client";

import { useMemo } from "react";
import { ShieldIcon } from "lucide-react";
import { useMatches } from "@/hooks/use-matches";
import { useLiveScores } from "@/hooks/use-live-scores";
import { MatchRow } from "@/components/shared/matches/match-row";
import { LoadingState } from "@/components/shared/state/loading-state";
import { ErrorState } from "@/components/shared/state/error-state";
import { EmptyState } from "@/components/shared/state/empty-state";
import { DISPLAY_TEXT_CLASS } from "@/utils/typography";
import { cn } from "@/lib/utils";
import { compareMatchesByStatus, isMatchLive } from "@/utils/match";

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

  const liveCount = sortedMatches.filter((match) => isMatchLive(match.status)).length;

  return (
    <div>
      <div className="flex items-baseline justify-between border-b pb-3">
        <h1 className={cn(DISPLAY_TEXT_CLASS, "text-base text-foreground")}>
          Today
        </h1>
        <span className={cn(DISPLAY_TEXT_CLASS, "text-xs text-muted-foreground")}>
          {liveCount} Live &middot; {sortedMatches.length} Matches
        </span>
      </div>
      <div className="divide-y">
        {sortedMatches.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
