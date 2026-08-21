"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useMatch } from "@/hooks/use-match";
import { useMatchLiveUpdates } from "@/hooks/use-match-live-updates";
import { MatchHeader } from "@/components/match-detail/match-header";
import { MatchTimeline } from "@/components/match-detail/match-timeline";
import { MatchStatistics } from "@/components/match-detail/match-statistics";
import { SectionCard } from "@/components/match-detail/section-card";
import { ChatPanel } from "@/components/chat/chat-panel";
import { LoadingState } from "@/components/state/loading-state";
import { ErrorState } from "@/components/state/error-state";

export function MatchDetailView({ matchId }: { matchId: string }) {
  const { data: match, isPending, isError, refetch } = useMatch(matchId);
  useMatchLiveUpdates(matchId);

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        All matches
      </Link>

      {isPending && <LoadingState label="Loading match…" />}

      {isError && (
        <ErrorState
          title="Couldn't load this match"
          description="It may no longer exist, or the feed is temporarily unavailable."
          onRetry={() => refetch()}
        />
      )}

      {match && (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-6">
            <MatchHeader match={match} />
            <SectionCard title="Match Timeline">
              <MatchTimeline events={match.events} />
            </SectionCard>
            <SectionCard title="Statistics">
              <MatchStatistics
                statistics={match.statistics}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
              />
            </SectionCard>
          </div>
          <ChatPanel key={matchId} matchId={matchId} />
        </div>
      )}
    </div>
  );
}
