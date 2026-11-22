import { Suspense } from "react";
import TeamtandingsTable from "../components/TeamStandingsTable";

export default function DriversPage() {
  return (
    <Suspense fallback={<p>Cargando clasificación...</p>}>
      <TeamtandingsTable />
    </Suspense>
  );
}