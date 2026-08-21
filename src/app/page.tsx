import { MatchList } from "@/components/matches/match-list";
import { DISPLAY_TEXT_CLASS } from "@/utils/typography";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      <div className="mb-6 space-y-1">
        <h1 className={cn(DISPLAY_TEXT_CLASS, "text-2xl text-foreground")}>
          Match Centre
        </h1>
        <p className="text-sm text-muted-foreground">
          Scores update automatically — no need to refresh.
        </p>
      </div>
      <MatchList />
    </div>
  );
}
