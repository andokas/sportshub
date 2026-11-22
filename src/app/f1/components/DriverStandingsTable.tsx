import { getDriverStandings } from "@/lib/f1/api";

async function DriverStandingsTable() {
  const standings = await getDriverStandings();

  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="px-3 py-2">Pos</th>
          <th className="px-3 py-2">Piloto</th>
          <th className="px-3 py-2">Equipo</th>
          <th className="px-3 py-2">Puntos</th>
          <th className="px-3 py-2">Victorias</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((s) => (
          <tr key={s.driver.id}>
            <td className="px-3 py-2">{s.position}</td>
            <td className="px-3 py-2">{s.driver.name} {s.driver.surname}</td>
            <td className="px-3 py-2">{s.team.name}</td>
            <td className="px-3 py-2">{s.points}</td>
            <td className="px-3 py-2">{s.wins}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function F1Page() {
  return (<DriverStandingsTable />);
}