
import { getRaceCalendar } from "@/lib/f1/api";

async function RaceCalendar() {
  const races = await getRaceCalendar();

  const now = new Date();

  const nextRace = races.find(
    (race) =>
      new Date(`${race.date}T${race.time || "23:59:59"}`) >= now
  );

  const season = races[0]?.season;

  return (
    <main className="min-h-screen bg-[#f1f0ec] text-[#171717]">

      {/* TITLE */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

          <div>
            <h1 className="text-7xl md:text-[110px] leading-[0.8] font-black italic tracking-tighter uppercase">
              Race
              <br />
              <span className="text-[#e10600]">Calendar.</span>
            </h1>

            <p className="text-xs font-black tracking-[0.25em] mt-7 text-gray-500">
              {season} SEASON
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-xs text-gray-500 font-bold tracking-widest mb-2">
              TOTAL ROUNDS
            </p>

            <p className="text-6xl font-black tracking-tighter">
              {String(races.length).padStart(2, "0")}
            </p>
          </div>

        </div>
      </section>

      {/* NEXT RACE */}
      {nextRace && (
        <section className="max-w-7xl mx-auto px-6 mb-14">
          <div className="bg-[#171717] text-white relative overflow-hidden">

            <div className="absolute top-0 right-0 w-2 h-full bg-[#e10600]" />

            <div className="p-7 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">

              {/* RACE INFO */}
              <div className="flex-1 w-full">
                <p className="text-[#e10600] text-xs font-black tracking-[0.3em] mb-5">
                  NEXT UP / ROUND {nextRace.round}
                </p>

                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight">
                  {nextRace.raceName}
                </h2>

                <p className="text-gray-400 mt-3 text-[11px] font-medium tracking-[0.2em] uppercase">
                  {nextRace.Circuit.circuitName}
                </p>
              </div>

              {/* CIRCUIT SVG */}
              <div className="w-full md:w-[35%] h-36 flex items-center justify-center">
                <img
                  src={`/f1/circuits/${season}/${nextRace.Circuit.circuitId}.svg`}
                  alt={`Trazado de ${nextRace.Circuit.circuitName}`}
                  className="w-full h-full object-contain opacity-80"
                />
              </div>

              {/* DATE */}
              <div className="md:text-right self-end md:self-center shrink-0">
                <p className="text-gray-500 text-xs font-bold tracking-widest">
                  RACE DATE
                </p>

                <p className="text-3xl md:text-4xl font-black mt-2">
                  {nextRace.date}
                </p>

                <p className="text-[#e10600] font-bold text-sm mt-2">
                  {nextRace.time || "TIME TBC"}
                </p>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* CALENDAR */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="border-b-2 border-black pb-4 mb-0">
          <h2 className="font-black uppercase tracking-widest text-sm">
            Full season schedule
          </h2>
        </div>

        <div>
          {races.map((race) => {
            const raceDate = new Date(
              `${race.date}T${race.time || "23:59:59"}`
            );

            const isPastRace = raceDate < now;
            const isNext = nextRace?.round === race.round;

            return (
              <article
                key={race.round}
                className={`
                  group grid
                  grid-cols-[40px_minmax(0,1fr)_65px]
                  md:grid-cols-[90px_minmax(0,1fr)_110px_180px_130px]
                  items-center gap-3 md:gap-8 py-6
                  border-b border-[#d0cfca]
                  transition-colors duration-200
                  hover:bg-white px-3
                  ${isPastRace ? "opacity-45" : ""}
                  ${isNext ? "border-l-4 border-l-[#e10600]" : ""}
                `}
              >

                {/* ROUND */}
                <div>
                  <span className="text-3xl md:text-5xl font-black italic tracking-tighter text-[#c9c8c3] group-hover:text-[#e10600] transition-colors">
                    {String(race.round).padStart(2, "0")}
                  </span>
                </div>

                {/* RACE INFO */}
                <div className="min-w-0">

                  <div className="flex items-center gap-2 mb-1">
                    {isNext && (
                      <span className="bg-[#e10600] text-white text-[9px] font-black px-2 py-1 tracking-widest">
                        NEXT RACE
                      </span>
                    )}

                    {isPastRace && (
                      <span className="text-[9px] font-black tracking-widest text-gray-500">
                        COMPLETED
                      </span>
                    )}
                  </div>

                  <h3 className="font-black text-base md:text-2xl uppercase italic tracking-tight leading-tight">
                    {race.raceName}
                  </h3>

                  <p className="text-[10px] md:text-[11px] text-gray-500 mt-1 font-medium tracking-[0.12em] uppercase">
                    {race.Circuit.circuitName}
                  </p>

                </div>

                {/* CIRCUIT SVG */}
                <div className="h-14 md:h-20 flex items-center justify-center">
                  <img
                    src={`/f1/circuits/${season}/${race.Circuit.circuitId}.svg`}
                    alt={`Trazado de ${race.Circuit.circuitName}`}
                    className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* DATE */}
                <div className="hidden md:block">
                  <p className="text-[9px] text-gray-400 font-black tracking-[0.2em] mb-1">
                    RACE DATE
                  </p>

                  <p className="font-bold text-sm">
                    {race.date}
                  </p>
                </div>

                {/* TIME / STATUS */}
                <div className="text-right">
                  <p className="text-[9px] text-gray-400 font-black tracking-[0.2em] mb-1">
                    {isPastRace ? "STATUS" : "START TIME"}
                  </p>

                  <p
                    className={`font-black text-xs md:text-sm ${
                      isPastRace
                        ? "text-gray-400"
                        : "text-[#e10600]"
                    }`}
                  >
                    {isPastRace
                      ? "FINISHED"
                      : race.time || "TBC"}
                  </p>
                </div>

              </article>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#171717] text-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

          <span className="text-xs font-black italic tracking-widest">
            RACE CALENDAR
          </span>

          <span className="text-[10px] text-gray-500 tracking-widest">
            BUILT FOR MOTORSPORT FANS
          </span>

        </div>
      </footer>

    </main>
  );
}

export default function F1Page() {
  return <RaceCalendar />;
}
