import { getDriverStandings } from "@/lib/f1/api";
import { getTeamColor } from "@/lib/f1/teams";
import { f1Font, youngserifFont } from "@/lib/fonts";
import Link from "next/link";

export default async function DriverStandingsTable() {
  const standings = await getDriverStandings();
  const leaderPoints = Math.max(...standings.map((s) => s.points), 1);

  return (
    <div className={`${youngserifFont.className} bg-[#f1f0ec] px-4 py-10 text-[#171717] md:px-6`}>
      {/* HEADER */}
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <h2 className={`${f1Font.className} text-4xl font-bold uppercase italic leading-[0.9] tracking-tight md:text-6xl`}>
            Driver
            <br />
            <span className="text-[#e10600]">
              Standings.
            </span>
          </h2>
        </div>
      </div>

      {/* COLUMN HEADERS */}
      <div className="grid grid-cols-[40px_minmax(0,1fr)_70px_50px] gap-3 border-b-[3px] border-[#171717] px-3 pb-4 md:grid-cols-[56px_minmax(0,1fr)_90px_70px] md:gap-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#e10600] md:text-xs">
          POS
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#171717] md:text-xs">
          DRIVER
        </span>
        <span className="text-right text-[11px] font-bold uppercase tracking-wider text-[#e10600] md:text-xs">
          PTS
        </span>
        <span className="text-right text-[11px] font-bold uppercase tracking-wider text-[#171717] md:text-xs">
          WINS
        </span>
      </div>

      {/* ROWS */}
      <div>
        {standings.map((s, index) => {
          const color = getTeamColor(s.team.id);
          const barWidth = (s.points / leaderPoints) * 100;

          return (
            <Link
              key={s.driver.id}
              href={`/f1/drivers/${s.driver.id}`}
              className="group relative grid grid-cols-[40px_minmax(0,1fr)_70px_50px] items-center gap-3 border-b border-[#d0cfca] px-3 py-4 transition-colors hover:bg-white md:grid-cols-[56px_minmax(0,1fr)_90px_70px] md:gap-5"
            >
              {/* TEAM COLOR */}
              <span
                className="absolute bottom-0 left-0 top-0 w-1"
                style={{ backgroundColor: color }}
              />

              {/* POSITION */}
              <span
                className={`${f1Font.className} text-2xl font-bold italic tracking-tight tabular-nums md:text-3xl ${
                  index === 0 ? "text-[#e10600]" : "text-[#b5b4af]"
                }`}
              >
                {String(s.position).padStart(2, "0")}
              </span>

              {/* DRIVER + TEAM + POINTS BAR */}
              <div className="min-w-0">
                <h3 className={`${f1Font.className} truncate text-sm uppercase italic tracking-[0.04em] md:text-lg`}>
                  <span className="font-normal">
                    {s.driver.name}{" "}
                  </span>
                  <span className="font-bold">
                    {s.driver.surname}
                  </span>
                  <span className="ml-2 text-[10px] font-bold not-italic tracking-[0.08em] text-gray-400">
                    {s.driver.code}
                  </span>
                </h3>

                <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
                  {s.team.name}
                  {s.driver.number !== null && ` · #${s.driver.number}`}
                </p>

                <div className="mt-2 h-1 w-full rounded-full bg-[#e4e3de]">
                  <div
                    className="h-1 rounded-full"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>

              {/* POINTS */}
              <span className={`${f1Font.className} text-right text-xl font-bold italic tracking-normal tabular-nums md:text-2xl`}>
                {s.points}
              </span>

              {/* WINS */}
              <span className="text-right text-sm font-normal tracking-[0.02em] tabular-nums text-gray-500 md:text-base">
                {s.wins}
              </span>
            </Link>
          );
        })}
      </div>

      {/* FOOTER */}
      <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
        Data: Jolpica F1 API
      </p>
    </div>
  );
}