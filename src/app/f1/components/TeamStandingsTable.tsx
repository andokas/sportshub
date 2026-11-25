
import { getTeamStandings } from "@/lib/f1/api";
import { getTeamColor } from "@/lib/f1/teams";
import { f1Font, youngserifFont } from "@/lib/fonts";
import Flag from "./Flag";

export default async function TeamStandingsTable({ season }: { season: string }) {
  const standings = await getTeamStandings(season);

  return (
    <div className={`${f1Font.className} bg-[#f1f0ec] px-4 py-10 text-[#171717] md:px-6`}>
      {standings.length === 0 ? (
        <p className="text-center text-lg font-medium text-[#171717]">
          The Constructors Championship was not awarded until{" "}
          <a
            href={`/f1/1958/teams`}
            className="font-bold text-[#e10600] underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            1958
          </a>
          .
        </p>
      ) : (
        <>
          {(() => {
            const leaderPoints = Math.max(
              ...standings.map((s) => s.points),
              1
            );

            return (
              <>
                {/* HEADER */}
                <div className="mb-8 flex items-end justify-between gap-6">
                  <div>
                    <h2 className={`${f1Font.className} text-4xl font-black uppercase italic leading-[0.9] tracking-tighter md:text-6xl`}>
                      Team
                      <br />
                      <span className="text-[#e10600]">
                        Standings.
                      </span>
                    </h2>
                  </div>
                </div>

                {/* COLUMN HEADERS */}
                <div className="grid grid-cols-[40px_minmax(0,1fr)_70px_50px] gap-3 border-b-[3px] border-[#171717] px-3 pb-4 md:grid-cols-[56px_minmax(0,1fr)_90px_70px] md:gap-5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#e10600] md:text-xs">
                    POS
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#171717] md:text-xs">
                    TEAM
                  </span>
                  <span className="text-right text-[11px] font-black uppercase tracking-wider text-[#e10600] md:text-xs">
                    PTS
                  </span>
                  <span className="text-right text-[11px] font-black uppercase tracking-wider text-[#171717] md:text-xs">
                    WINS
                  </span>
                </div>

                {/* ROWS */}
                <div>
                  {standings.map((s, index) => {
                    const color = getTeamColor(s.team.id);
                    const barWidth = (s.points / leaderPoints) * 100;

                    return (
                      <div
                        key={s.team.id}
                        className="group relative grid grid-cols-[40px_minmax(0,1fr)_70px_50px] items-center gap-3 border-b border-[#d0cfca] px-3 py-4 transition-colors hover:bg-white md:grid-cols-[56px_minmax(0,1fr)_90px_70px] md:gap-5"
                      >
                        {/* TEAM COLOR */}
                        <span
                          className="absolute bottom-0 left-0 top-0 w-1"
                          style={{ backgroundColor: color }}
                        />

                        {/* POSITION */}
                        <span
                          className={`${f1Font.className} text-2xl font-black italic tracking-tighter tabular-nums md:text-3xl ${
                            index === 0 ? "text-[#e10600]" : "text-[#b5b4af]"
                          }`}
                        >
                          {s.position === null
                            ? "—"
                            : String(s.position).padStart(2, "0")}
                        </span>

                        {/* TEAM + POINTS BAR */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <Flag nationality={s.team.nationality} />
                            <h3 className={`${f1Font.className} truncate text-sm font-black uppercase italic tracking-wide md:text-lg`}>
                              {s.team.name}
                            </h3>
                          </div>
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
                        <span className={`${f1Font.className} text-right text-xl font-black italic tracking-tighter tabular-nums md:text-2xl`}>
                          {s.points}
                        </span>

                        {/* WINS */}
                        <span className="text-right text-sm font-bold tabular-nums text-gray-500 md:text-base">
                          {s.wins}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </>
      )}
    </div>
  );
}
