import {
  AlertTriangleIcon,
  ArrowLeftRightIcon,
  GoalIcon,
  SquareIcon,
  TargetIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatEventType } from "@/utils/match";
import { DISPLAY_TEXT_CLASS } from "@/utils/typography";
import type { MatchEvent, MatchEventType } from "@/types/match";
import { EmptyState } from "@/components/state/empty-state";
import { ScrollArea } from "@/components/ui/scroll-area";

const EVENT_ICONS: Record<MatchEventType, LucideIcon> = {
  GOAL: GoalIcon,
  YELLOW_CARD: SquareIcon,
  RED_CARD: SquareIcon,
  SUBSTITUTION: ArrowLeftRightIcon,
  FOUL: AlertTriangleIcon,
  SHOT: TargetIcon,
};

const EVENT_ICON_STYLES: Record<MatchEventType, string> = {
  GOAL: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  YELLOW_CARD: "bg-amber-400/20 text-amber-600 dark:text-amber-400",
  RED_CARD: "bg-destructive/15 text-destructive",
  SUBSTITUTION: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  FOUL: "bg-muted text-muted-foreground",
  SHOT: "bg-muted text-muted-foreground",
};

export function MatchTimeline({ events }: Readonly<{ events: MatchEvent[] }>) {
  if (events.length === 0) {
    return (
      <EmptyState
        icon={TargetIcon}
        title="No events yet"
        description="Match events will appear here as they happen."
      />
    );
  }

  const sorted = [...events].sort((a, b) => b.minute - a.minute);

  return (
    <ScrollArea className="h-112 pr-3">
      <ol className="flex flex-col gap-3">
        {sorted.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </ol>
    </ScrollArea>
  );
}

function TimelineItem({ event }: Readonly<{ event: MatchEvent }>) {
  const Icon = EVENT_ICONS[event.type];

  return (
    <li className="flex gap-3">
      <div className="flex w-10 shrink-0 flex-col items-center">
        <span className={cn(DISPLAY_TEXT_CLASS, "text-xs text-muted-foreground tabular-nums")}>
          {event.minute}&apos;
        </span>
      </div>
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          EVENT_ICON_STYLES[event.type]
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1 pb-3">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm font-medium">{event.player}</span>
          <span className="text-xs text-muted-foreground">
            {formatEventType(event.type)} · {event.team === "home" ? "Home" : "Away"}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">{event.description}</p>
        {event.assistPlayer && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            Assist: {event.assistPlayer}
          </p>
        )}
      </div>
    </li>
  );
}
