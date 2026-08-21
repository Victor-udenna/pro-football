"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useMatch } from "@/hooks/use-match";
import { useMatchLiveUpdates } from "@/hooks/use-match-live-updates";
import { MatchHeader } from "@/components/shared/match-detail/match-header";
import { MatchTimeline } from "@/components/shared/match-detail/match-timeline";
import { MatchStatistics } from "@/components/shared/match-detail/match-statistics";
import { SectionCard } from "@/components/shared/match-detail/section-card";
import { ChatPanel } from "@/components/shared/chat/chat-panel";
import { LoadingState } from "@/components/shared/state/loading-state";
import { ErrorState } from "@/components/shared/state/error-state";
import { ApiError } from "@/services/api";
import { cn } from "@/lib/utils";
import { DISPLAY_TEXT_CLASS } from "@/utils/typography";

const TABS = [
  { key: "timeline", label: "Timeline" },
  { key: "stats", label: "Stats" },
  { key: "messages", label: "Messages" },
] as const;

type Tab = (typeof TABS)[number]["key"];

export function MatchDetailView({ matchId }: Readonly<{ matchId: string }>) {
  const { data: match, isPending, isError, error, refetch } = useMatch(matchId);
  useMatchLiveUpdates(matchId);
  const [activeTab, setActiveTab] = useState<Tab>("timeline");

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

      {match && !isError && (
        <div>
          <div className="border-b pb-6">
            <MatchHeader match={match} />
          </div>

          <div className="flex border-b">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  DISPLAY_TEXT_CLASS,
                  "flex-1 cursor-pointer border-b-2 py-3 text-center text-xs transition-colors",
                  tab.key === "messages" && "lg:hidden",
                  activeTab === tab.key
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col">
              <div className={cn("pt-6", activeTab !== "timeline" && "hidden")}>
                <SectionCard title="Match Timeline">
                  <MatchTimeline events={match.events} />
                </SectionCard>
              </div>
              <div className={cn("pt-6", activeTab !== "stats" && "hidden")}>
                <SectionCard title="Statistics">
                  <MatchStatistics
                    statistics={match.statistics}
                    homeTeam={match.homeTeam}
                    awayTeam={match.awayTeam}
                  />
                </SectionCard>
              </div>
            </div>
            <div
              className={cn("pt-6", activeTab !== "messages" && "hidden lg:block")}
            >
              <ChatPanel key={matchId} matchId={matchId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
