import { MatchList } from "@/components/shared/matches/match-list";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      <MatchList />
    </div>
  );
}