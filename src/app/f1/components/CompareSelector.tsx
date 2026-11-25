
"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { f1Font } from "@/lib/fonts";

type Option = { id: string; label: string };

export default function CompareSelector({
  drivers,
  a,
  b,
}: {
  drivers: Option[];
  a: string;
  b: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function update(newA: string, newB: string) {
    startTransition(() => {
      router.push(`/f1/compare?a=${newA}&b=${newB}`, { scroll: false });
    });
  }

  const selectClass =
    `${f1Font.className} w-full border-2 border-[#171717] bg-white p-3 text-sm font-bold uppercase italic tracking-wide focus:outline-none focus:ring-2 focus:ring-[#e10600]`;

  return (
    <div
      className={`grid grid-cols-[1fr_auto_1fr] items-center gap-3 transition-opacity ${
        isPending ? "opacity-60" : ""
      }`}
    >
      <select
        value={a}
        onChange={(e) => update(e.target.value, b)}
        className={selectClass}
        aria-label="Piloto A"
      >
        {drivers.map((d) => (
          <option key={d.id} value={d.id}>
            {d.label}
          </option>
        ))}
      </select>

      {/* Botón para intercambiar A y B */}
      <button
        type="button"
        onClick={() => update(b, a)}
        className={`${f1Font.className} border-2 border-[#171717] bg-white px-3 py-3 text-sm font-bold italic hover:bg-[#171717] hover:text-white`}
        aria-label="Intercambiar pilotos"
        title="Intercambiar"
      >
        ⇄
      </button>

      <select
        value={b}
        onChange={(e) => update(a, e.target.value)}
        className={selectClass}
        aria-label="Piloto B"
      >
        {drivers.map((d) => (
          <option key={d.id} value={d.id}>
            {d.label}
          </option>
        ))}
      </select>
    </div>
  );
}
