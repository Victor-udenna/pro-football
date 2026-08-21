import { MatchDetailView } from "@/components/match-detail/match-detail-view";

export default async function MatchPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  return <MatchDetailView matchId={id} />;
}
