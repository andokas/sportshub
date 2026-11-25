
import { CompareRow, getWinner } from "@/lib/f1/compare";
import { getTeamColor } from "@/lib/f1/teams";
import { F1DriverStanding } from "@/lib/f1/types";
import { f1Font } from "@/lib/fonts";

function formatValue(value: number | null, decimals = 0) {
  return value === null ? "—" : value.toFixed(decimals);
}

export default function CompareTable({
  a,
  b,
  rows,
}: {
  a: F1DriverStanding;
  b: F1DriverStanding;
  rows: CompareRow[];
}) {
  const colorA = getTeamColor(a.team.id);
  // Si son compañeros de equipo, B usa un color neutro para distinguirlos
  const colorB = a.team.id === b.team.id ? "#171717" : getTeamColor(b.team.id);

  return (
    <div className="mt-8">
      {/* CABECERA */}
      <div className="mb-4 grid grid-cols-[1fr_auto_1fr] items-end gap-4 border-b-[3px] border-[#171717] pb-4">
        <div className="border-l-4 pl-3" style={{ borderColor: colorA }}>
          <p className={`${f1Font.className} text-lg font-bold uppercase italic leading-tight tracking-tight md:text-2xl`}>
            <span className="font-normal">{a.driver.name} </span>
            <span className="font-bold">{a.driver.surname}</span>
          </p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
            {a.team.name}
          </p>
        </div>

        <span className={`${f1Font.className} pb-1 text-sm font-bold italic text-gray-400`}>
          VS
        </span>

        <div
          className="border-r-4 pr-3 text-right"
          style={{ borderColor: colorB }}
        >
          <p className={`${f1Font.className} text-lg font-bold uppercase italic leading-tight tracking-tight md:text-2xl`}>
            <span className="font-normal">{b.driver.name} </span>
            <span className="font-bold">{b.driver.surname}</span>
          </p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
            {b.team.name}
          </p>
        </div>
      </div>

      {/* FILAS */}
      {rows.map((row) => {
        const winner = getWinner(row);

        return (
          <div
            key={row.label}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-[#d0cfca] px-1 py-3"
          >
            {/* Valor de A */}
            <div>
              <span
                className={`${f1Font.className} inline-block rounded px-3 py-1 text-xl italic tracking-normal tabular-nums md:text-2xl ${
                  winner === "a"
                    ? "font-bold"
                    : "font-normal text-gray-500"
                }`}
                style={
                  winner === "a"
                    ? { backgroundColor: `${colorA}30` }
                    : undefined
                }
              >
                {formatValue(row.a, row.decimals)}
              </span>
            </div>

            {/* Etiqueta */}
            <span className="min-w-[90px] text-center text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 md:min-w-[140px]">
              {row.label}
            </span>

            {/* Valor de B */}
            <div className="text-right">
              <span
                className={`${f1Font.className} inline-block rounded px-3 py-1 text-xl italic tracking-normal tabular-nums md:text-2xl ${
                  winner === "b"
                    ? "font-bold"
                    : "font-normal text-gray-500"
                }`}
                style={
                  winner === "b"
                    ? { backgroundColor: `${colorB}30` }
                    : undefined
                }
              >
                {formatValue(row.b, row.decimals)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
