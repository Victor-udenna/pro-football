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
import { ApiError } from "@/services/api";

export function MatchDetailView({ matchId }: Readonly<{ matchId: string }>) {
  const { data: match, isPending, isError, error, refetch } = useMatch(matchId);
  useMatchLiveUpdates(matchId);

  const notFound = error instanceof ApiError && error.status === 404;

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

      {isError && notFound && (
        <ErrorState
          title="This match has ended and is no longer available"
          description="Finished matches drop out of the live feed after a while. Head back to see what's on now."
          homeHref="/"
        />
      )}

      {isError && !notFound && (
        <ErrorState
          title="Couldn't load this match"
          description="The feed is temporarily unavailable."
          onRetry={() => refetch()}
          homeHref="/"
        />
      )}

      {match && (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col divide-y">
            <div className="pb-6">
              <MatchHeader match={match} />
            </div>
            <div className="py-6">
              <SectionCard title="Match Timeline">
                <MatchTimeline events={match.events} />
              </SectionCard>
            </div>
            <div className="pt-6">
              <SectionCard title="Statistics">
                <MatchStatistics
                  statistics={match.statistics}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                />
              </SectionCard>
            </div>
          </div>
          <ChatPanel key={matchId} matchId={matchId} />
        </div>
      )}
    </div>
  );
}
