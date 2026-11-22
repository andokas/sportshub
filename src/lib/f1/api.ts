import { F1Driver, F1Team, F1Circuit, F1DriverStanding, F1TeamStanding, F1RaceList } from "./types";

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
  
  const standings = list.DriverStandings;

  const driverStandings: F1DriverStanding[] = standings.map((s: any): F1DriverStanding => {
      const driver: F1Driver = {
        id: s.Driver.driverId,
        number: s.Driver.permanentNumber 
            ? Number(s.Driver.permanentNumber) 
            : null,
        code: s.Driver.code,
        name: s.Driver.givenName,
        surname: s.Driver.familyName,
        dateOfBirth: s.Driver.dateOfBirth,
        nationality: s.Driver.nationality,
      };

      const team: F1Team = {
        id: s.Constructors[0].constructorId,
        name: s.Constructors[0].name,
        nationality: s.Constructors[0].nationality,
      };

      return {
        position: Number(s.position),
        points: Number(s.points),
        wins: Number(s.wins),
        driver,
        team
      };
    }
  );

  return driverStandings;
}

export async function getTeamStandings(season = "current"): Promise<F1TeamStanding[]> {
  const response = await fetch("https://api.jolpi.ca/ergast/f1/" + season + "/constructorstandings/?format=json");

  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }

  const data = await response.json();
  const list = data.MRData.StandingsTable.StandingsLists[0];

  if (!list) {
    throw new Error("No se encontraron datos de clasificación para la temporada especificada");
  }

  const standings = list.ConstructorStandings;

  const teamStandings: F1TeamStanding[] = standings.map((s: any): F1TeamStanding => {
      const team: F1Team = {
        id: s.Constructor.constructorId,
        name: s.Constructor.name,
        nationality: s.Constructor.nationality,
      };

      return {
        position: Number(s.position),
        points: Number(s.points),
        wins: Number(s.wins),
        team
      };
    }
  );
  
  return teamStandings;
}

export async function getRaceCalendar(season = "current"): Promise<F1RaceList[]> {
  const response = await fetch("https://api.jolpi.ca/ergast/f1/" + season + "/?format=json&limit=100");

  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }

  const data = await response.json();
  const races = data.MRData.RaceTable.Races;
  
  if (!races || races.length === 0) {
    throw new Error("No se encontraron carreras para la temporada especificada");
  }

  const raceCalendar: F1RaceList[] = races.map((r: any): F1RaceList => {
    const circuit: F1Circuit = {
      circuitId: r.Circuit.circuitId,
      circuitName: r.Circuit.circuitName,
      location: {
        lat: Number(r.Circuit.Location.lat),
        long: Number(r.Circuit.Location.long),
        locality: r.Circuit.Location.locality,
        country: r.Circuit.Location.country,
      },
    };

    return {
      season: r.season,
      round: Number(r.round),
      raceName: r.raceName,
      Circuit: circuit,
      date: r.date,
      time: r.time,
    };
  });

  return raceCalendar;
}