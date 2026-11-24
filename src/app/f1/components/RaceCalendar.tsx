import { connection } from "next/server";
import { getRaceCalendar } from "@/lib/f1/api";
import { f1Font, youngserifFont } from "@/lib/fonts";

// Si no hay hora (time), asumimos final del día en UTC (la "Z" es importante)
function getRaceDate(race: { date: string; time?: string }) {
  return new Date(`${race.date}T${race.time ?? "23:59:59Z"}`);
}

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Europe/Madrid",
});

const timeFormatter = new Intl.DateTimeFormat("es-ES", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Madrid",
});

export default async function RaceCalendar() {
  await connection(); // este componente depende de la fecha de hoy
  const races = await getRaceCalendar();

  const now = new Date();
  const nextRace = races.find((race) => getRaceDate(race) >= now);
  const season = races[0]?.season;

  return (
    <div className={`${youngserifFont.className} bg-[#f1f0ec] px-4 py-10 text-[#171717] md:px-6`}>
      {/* HEADER */}
      <section className="mb-8 flex items-end justify-between gap-6 px-6">
        <div>
          <h2 className={`${f1Font.className} text-4xl font-bold uppercase italic leading-[0.9] tracking-tight md:text-6xl`}>
            Race
            <br />
            <span className="text-[#e10600]">
              Calendar.
            </span>
          </h2>
          <p className="mt-7 text-xs font-black tracking-[0.25em] text-gray-500">
            {season} SEASON
          </p>
        </div>

        <div className="text-right">
          <p className="mb-2 text-xs font-bold tracking-widest text-gray-500">
            TOTAL ROUNDS
          </p>
          <p className={`${f1Font.className} text-6xl font-black tracking-tighter`}>
            {String(races.length).padStart(2, "0")}
          </p>
        </div>
      </section>

      {/* NEXT RACE */}
      {nextRace && (
        <section className="mb-14 px-6">
          <div className="relative overflow-hidden bg-[#171717] text-white">
            <div className="absolute right-0 top-0 h-full w-2 bg-[#e10600]" />

            <div className="flex flex-col items-center justify-between gap-8 p-7 md:flex-row md:p-10">
              <div className="w-full flex-1">
                <p className="mb-5 text-xs font-black tracking-[0.3em] text-[#e10600]">
                  NEXT UP / ROUND {nextRace.round}
                </p>
                <h3 className={`${f1Font.className} text-3xl font-black uppercase italic tracking-tight md:text-4xl`}>
                  {nextRace.raceName}
                </h3>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
                  {nextRace.Circuit.circuitName}
                </p>
              </div>

              <div className="flex h-36 w-full items-center justify-center md:w-[35%]">
                <img
                  src={`/f1/circuits/${season}/${nextRace.Circuit.circuitId}.svg`}
                  alt={`Trazado de ${nextRace.Circuit.circuitName}`}
                  className="h-full w-full object-contain opacity-80"
                />
              </div>

              <div className="shrink-0 self-end md:self-center md:text-right">
                <p className="text-xs font-bold tracking-widest text-gray-500">
                  RACE DATE
                </p>
                <p className={`${f1Font.className} mt-2 text-2xl font-black md:text-3xl`}>
                  {dateFormatter.format(getRaceDate(nextRace))}
                </p>
                <p className="mt-2 text-sm font-bold text-[#e10600]">
                  {nextRace.time
                    ? timeFormatter.format(getRaceDate(nextRace))
                    : "TIME TBC"}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CALENDAR */}
      <section className="px-6 pb-20">
        <div className="border-b-2 border-black pb-4">
          <h3 className={`${f1Font.className} text-sm font-black uppercase tracking-widest`}>
            Full season schedule
          </h3>
        </div>

        <div>
          {races.map((race) => {
            const raceDate = getRaceDate(race);
            const isPastRace = raceDate < now;
            const isNext = nextRace?.round === race.round;

            return (
              <article
                key={race.round}
                className={`
                  group grid
                  grid-cols-[40px_minmax(0,1fr)_65px]
                  items-center gap-3 border-b border-[#d0cfca] px-3 py-6
                  transition-colors duration-200 hover:bg-white
                  md:grid-cols-[60px_minmax(0,1fr)_100px_110px_80px] md:gap-6
                  ${isPastRace ? "opacity-45" : ""}
                  ${isNext ? "border-l-4 border-l-[#e10600]" : ""}
                `}
              >
                {/* ROUND */}
                <span className={`${f1Font.className} text-3xl font-black italic tracking-tighter text-[#c9c8c3] transition-colors group-hover:text-[#e10600] md:text-4xl`}>
                  {String(race.round).padStart(2, "0")}
                </span>

                {/* RACE INFO */}
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    {isNext && (
                      <span className="bg-[#e10600] px-2 py-1 text-[9px] font-black tracking-widest text-white">
                        NEXT RACE
                      </span>
                    )}
                    {isPastRace && (
                      <span className="text-[9px] font-black tracking-widest text-gray-500">
                        COMPLETED
                      </span>
                    )}
                  </div>
                  <h4 className={`${f1Font.className} text-base font-black uppercase italic leading-tight tracking-tight md:text-xl`}>
                    {race.raceName}
                  </h4>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500 md:text-[11px]">
                    {race.Circuit.circuitName}
                  </p>
                </div>

                {/* CIRCUIT SVG */}
                <div className="flex h-14 items-center justify-center md:h-16">
                  <img
                    src={`/f1/circuits/${season}/${race.Circuit.circuitId}.svg`}
                    alt={`Trazado de ${race.Circuit.circuitName}`}
                    className="h-full w-full object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                {/* DATE */}
                <div className="hidden md:block">
                  <p className="mb-1 text-[9px] font-black tracking-[0.2em] text-gray-400">
                    RACE DATE
                  </p>
                  <p className="text-sm font-bold">
                    {dateFormatter.format(raceDate)}
                  </p>
                </div>

                {/* TIME / STATUS */}
                <div className="text-right">
                  <p className="mb-1 text-[9px] font-black tracking-[0.2em] text-gray-400">
                    {isPastRace ? "STATUS" : "START"}
                  </p>
                  <p
                    className={`${f1Font.className} text-xs font-black md:text-sm ${
                      isPastRace ? "text-gray-400" : "text-[#e10600]"
                    }`}
                  >
                    {isPastRace
                      ? "FINISHED"
                      : race.time
                        ? timeFormatter.format(raceDate)
                        : "TBC"}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}