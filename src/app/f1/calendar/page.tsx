import { Suspense } from "react";
import CalendarTable from "../components/RaceCalendar";

export default function CalendarPage() {
  return (
    <Suspense fallback={<p>Cargando calendario...</p>}>
      <CalendarTable />
    </Suspense>
  );
}