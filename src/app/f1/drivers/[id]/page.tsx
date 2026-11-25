import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDriverStandings, getDriverResults } from "@/lib/f1/api";
import { getTeamColor } from "@/lib/f1/teams";
import { f1Font, youngserifFont } from "@/lib/fonts";
import Flag from "@/app/f1/components/Flag";
import DriverPhoto from "../../components/DriverPhotos";

export async function generateStaticParams() {
  const standings = await getDriverStandings();
  return standings.map((s) => ({ id: s.driver.id }));
}

async function DriverResults({
  driverId,
  color,
}: {
  driverId: string;
  color: string;
}) {
  const results = await getDriverResults(driverId);

  if (results.length === 0) {
    return <p className="text-sm text-gray-500">Sin resultados todavía.</p>;
  }

  return (
    <div>
      {/* COLUMN HEADERS */}
      <div className="grid grid-cols-[32px_minmax(0,1fr)_44px_52px_44px] gap-3 border-b-2 border-[#171717] px-3 pb-3 md:grid-cols-[48px_minmax(0,1fr)_64px_72px_56px] md:gap-5">
        <span className="text-[9px] font-black tracking-widest text-gray-400">
          RD
        </span>
        <span className="text-[9px] font-black tracking-widest text-gray-400">
          GRAND PRIX
        </span>
        <span className="text-right text-[9px] font-black tracking-widest text-gray-400">
          GRID
        </span>
        <span className="text-right text-[9px] font-black tracking-widest text-gray-400">
          FINISH
        </span>
        <span className="text-right text-[9px] font-black tracking-widest text-gray-400">
          PTS
        </span>
      </div>

      {results.map((r) => {
        const finished = r.finished;

        return (
          <div
            key={r.round}
            className="group relative grid grid-cols-[32px_minmax(0,1fr)_44px_52px_44px] items-center gap-3 border-b border-[#d0cfca] px-3 py-3 transition-colors hover:bg-white md:grid-cols-[48px_minmax(0,1fr)_64px_72px_56px] md:gap-5"
          >
            <span
                className="absolute bottom-0 left-0 top-0 w-1"
                style={{ backgroundColor: color }}
            />

            <span className="text-lg font-black italic tabular-nums text-[#b5b4af] md:text-2xl">
              {String(r.round).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <p className="truncate text-sm font-black uppercase italic tracking-wide md:text-base">
                {r.raceName}
              </p>
              {!finished && (
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#e10600]">
                  {r.status}
                </p>
              )}
            </div>

            {/* grid = 0 significa salida desde el pit lane */}
            <span className="text-right text-sm font-bold tabular-nums text-gray-500">
              {r.grid === 0 ? "PL" : `P${r.grid}`}
            </span>

            <span
              className={`text-right text-lg font-black italic tabular-nums md:text-xl ${
                finished ? "" : "text-gray-400"
              }`}
            >
              {r.finishLabel}
            </span>

            <span className="text-right text-sm font-bold tabular-nums md:text-base">
              {r.points}
            </span>
          </div>
        );
      })}
    </div>
  );
}

async function DriverContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const standings = await getDriverStandings();
  const standing = standings.find((s) => s.driver.id === id);

  if (!standing) notFound();

  const { driver, team } = standing;
  const color = getTeamColor(team.id);

  return (
    <div className={youngserifFont.className}>
      {/* HEADER */}
      <div className="mb-10">
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-0 flex-1">
            <h2 className={`${f1Font.className} text-5xl uppercase italic leading-[0.9] tracking-tight md:text-7xl`}>
              {driver.name}
              <br />
              <span className="text-[#e10600]">{driver.surname}.</span>
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              <span className={`${f1Font.className} text-[120px] italic leading-[0.8] tracking-tighter md:text-[200px]`} style={{ color: `${color}30` }} >
                {driver.number ?? "—"}
              </span>

              <div className="flex items-center gap-4">
                <span className="h-7 w-1.5 md:h-9" style={{ backgroundColor: color }} />
                <Flag nationality={team.nationality} className="!h-5 !w-7 md:!h-7 md:!w-10" />
                <p className={`${f1Font.className} text-2xl uppercase italic tracking-tight md:text-4xl`}>
                  {team.name}
                </p>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <DriverPhoto
              driverId={driver.id}
              name={`${driver.name} ${driver.surname}`}
              color={color}
              className="h-52 w-40 rounded-lg md:h-80 md:w-64"
            />
          </div>
        </div>
        <div className="border-b-[3px] border-[#171717] pb-6"></div>
      </div>

      {/* SEASON STATS */}
      <div className="mb-10">
        <h3
          className={`${f1Font.className} mb-5 text-2xl uppercase italic tracking-tight md:text-3xl`}
        >
          Season <span className="text-[#e10600]">Stats.</span>
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Position", value: standing.position },
            { label: "Points", value: standing.points },
            { label: "Wins", value: standing.wins },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border-t-[3px] border-[#171717] bg-white p-4 md:p-6"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                {stat.label}
              </p>
              <p
                className={`${f1Font.className} mt-2 text-3xl italic tabular-nums md:text-5xl`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RACE RESULTS */}
      <div className="mb-10">
        <h3
          className={`${f1Font.className} mb-5 text-2xl uppercase italic tracking-tight md:text-3xl`}
        >
          Race <span className="text-[#e10600]">Results.</span>
        </h3>

        <Suspense fallback={<p className="text-sm text-gray-500">Cargando resultados...</p>}>
          <DriverResults driverId={id} color={color} />
        </Suspense>
      </div>

    </div>
  );
}

export default function DriverPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p className="p-6">Cargando piloto...</p>}>
      <DriverContent params={params} />
    </Suspense>
  );
}