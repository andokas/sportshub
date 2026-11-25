import { Suspense } from "react";
import { resolveSeason } from "@/lib/f1/season";
import TeamStandingsTable from "../../components/TeamStandingsTable";

async function TeamsContent({
  params,
}: {
  params: Promise<{ season: string }>;
}) {
  const { season } = await params;
  const validSeason = await resolveSeason(season);
  return <TeamStandingsTable season={validSeason} />;
}

export default function TeamsPage({
  params,
}: {
  params: Promise<{ season: string }>;
}) {
  return (
    <Suspense fallback={<p>Cargando clasificación...</p>}>
      <TeamsContent params={params} />
    </Suspense>
  );
}