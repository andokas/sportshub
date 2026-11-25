import { Suspense } from "react";
import { resolveSeason } from "@/lib/f1/season";
import DriverStandingsTable from "../../components/DriverStandingsTable";

async function DriversContent({
  params,
}: {
  params: Promise<{ season: string }>;
}) {
  const { season } = await params;
  const validSeason = await resolveSeason(season);
  return <DriverStandingsTable season={validSeason} />;
}

export default function DriversPage({
  params,
}: {
  params: Promise<{ season: string }>;
}) {
  return (
    <Suspense fallback={<p>Cargando clasificación...</p>}>
      <DriversContent params={params} />
    </Suspense>
  );
}