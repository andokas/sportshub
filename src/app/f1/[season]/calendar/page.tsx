import { Suspense } from "react";
import { resolveSeason } from "@/lib/f1/season";
import CalendarTable from "../../components/RaceCalendar";

async function CalendarContent({
  params,
}: {
  params: Promise<{ season: string }>;
}) {
  const { season } = await params;
  const validSeason = await resolveSeason(season);
  return <CalendarTable season={validSeason} />;
}

export default function CalendarPage({
  params,
}: {
  params: Promise<{ season: string }>;
}) {
  return (
    <Suspense fallback={<p>Cargando calendario...</p>}>
      <CalendarContent params={params} />
    </Suspense>
  );
}