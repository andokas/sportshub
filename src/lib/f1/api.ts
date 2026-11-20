import { F1DriverStanding, F1Driver, F1Team } from "./types";

export async function getDriverStandings(season = "current"): Promise<F1DriverStanding[]> {
  const response = await fetch("https://api.jolpi.ca/ergast/f1/" + season + "/driverstandings/?format=json");

  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }
  const data = await response.json();

  const list = data.MRData.StandingsTable.StandingsLists[0];
  if (!list) {
    throw new Error("No se encontraron datos de clasificación para la temporada especificada");
  }
  const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

  const driverStandings: F1DriverStanding[] = standings.map((standing: any): F1DriverStanding => {
      const driver: F1Driver = {
        id: standing.Driver.driverId,
        number: standing.Driver.permanentNumber 
            ? Number(standing.Driver.permanentNumber) 
            : null,
        code: standing.Driver.code,
        name: standing.Driver.givenName,
        surname: standing.Driver.familyName,
        dateOfBirth: standing.Driver.dateOfBirth,
        nationality: standing.Driver.nationality,
      };

      const team: F1Team = {
        id: standing.Constructors[0].constructorId,
        name: standing.Constructors[0].name,
        nationality: standing.Constructors[0].nationality,
      };

      return {
        position: Number(standing.position),
        points: Number(standing.points),
        wins: Number(standing.wins),
        driver,
        team
      };
    }
  );

  return driverStandings;
}