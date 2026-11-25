"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function SeasonSelector({ seasons }: { seasons: number[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const segments = pathname.split("/");
  const seasonParam = segments[2] || "current";
  const section = segments[3] || "drivers";

  // "current" equivale al año más reciente de la lista
  const selected = seasonParam === "current" ? String(seasons[0]) : seasonParam;

  function onChange(year: string) {
    // Solo se conserva la sección. Un piloto o una pareja del comparador
    // pueden no existir en el otro año, así que se descartan.
    startTransition(() => {
      router.push(`/f1/${year}/${section}`, { scroll: false });
    });
  }

  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Temporada"
      className={`border-2 border-[#171717] bg-white px-3 py-2 text-sm font-black tabular-nums focus:outline-none focus:ring-2 focus:ring-[#e10600] ${
        isPending ? "opacity-60" : ""
      }`}
    >
      {seasons.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}