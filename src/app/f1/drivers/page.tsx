import { Suspense } from "react";
import DriverStandingsTable from "../components/DriverStandingsTable";

export default function DriversPage() {
  return (
    <Suspense fallback={<p>Cargando clasificación...</p>}>
      <DriverStandingsTable />
    </Suspense>
  );
}