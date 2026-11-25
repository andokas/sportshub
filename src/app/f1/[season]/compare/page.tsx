import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDriverStandings, getDriverResults, getDriverSprints } from "@/lib/f1/api";
import { computeDriverStats } from "@/lib/f1/stats";
import CompareSelector from "../../components/CompareSelector";
import CompareTable from "@/app/f1/components/CompareTable";
import { buildCompareRows, buildCumulativePoints } from "@/lib/f1/compare";
import { getCompareColors } from "@/lib/f1/teams";
import PointsChart from "../../components/PointsChart";

async function CompareContent({
  searchParams,
}: {
  searchParams: Promise<{ a?: string; b?: string }>;
}) {
  const { a, b } = await searchParams;
  const standings = await getDriverStandings();

  if (standings.length < 2) {
    return <p>No hay datos suficientes para comparar.</p>;
  }

  const drivers = standings.map((s) => ({
    id: s.driver.id,
    label: `${s.driver.name} ${s.driver.surname}`,
  }));

  const idA = a ?? standings[0].driver.id;
  const idB = b ?? standings[1].driver.id;

  const standingA = standings.find((s) => s.driver.id === idA);
  const standingB = standings.find((s) => s.driver.id === idB);
  if (!standingA || !standingB) notFound();

  const [resultsA, resultsB, sprintsA, sprintsB] = await Promise.all([
    getDriverResults(idA),
    getDriverResults(idB),
    getDriverSprints(idA),
    getDriverSprints(idB),
  ]);

  const rows = buildCompareRows(
    { ...standingA, stats: computeDriverStats(resultsA) },
    { ...standingB, stats: computeDriverStats(resultsB) }
  );

  return (
    <div>
      <CompareSelector drivers={drivers} a={idA} b={idB} />

      {idA === idB ? (
        <p className="mt-6 text-sm text-gray-500">
          Elige dos pilotos distintos para compararlos.
        </p>
      ) : (
        <>
          <CompareTable a={standingA} b={standingB} rows={rows} />
          <PointsChart
            data={buildCumulativePoints(resultsA, resultsB, sprintsA, sprintsB)}
            nameA={`${standingA.driver.name} ${standingA.driver.surname}`}
            nameB={`${standingB.driver.name} ${standingB.driver.surname}`}
            {...getCompareColors(standingA.team.id, standingB.team.id)}
          />
        </>
      )}
    </div>
  );
}

export default function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ a?: string; b?: string }>;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-gray-500">Cargando comparador...</p>}>
      <CompareContent searchParams={searchParams} />
    </Suspense>
  );
}