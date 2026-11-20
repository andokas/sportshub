import { Suspense } from "react";
import { getDriverStandings } from "@/lib/f1/api";

async function DriverStandingsTable() {
  const standings = await getDriverStandings();

  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <th>Pos</th>
          {/* TODO: Piloto, Equipo, Puntos, Victorias */}
        </tr>
      </thead>
      <tbody>
        {/* TODO: standings.map(...) con una fila <tr> por piloto */}
      </tbody>
    </table>
  );
}

export default function F1Page() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">🏎️ Fórmula 1</h1>
      <Suspense fallback={<p>Cargando clasificación...</p>}>
        <DriverStandingsTable />
      </Suspense>
    </main>
  );
}