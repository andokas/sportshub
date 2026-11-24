import { F1Driver, F1Team, F1Circuit, F1DriverStanding, F1TeamStanding, F1RaceList, F1RaceResult } from "./types";
import { cacheLife } from "next/cache";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

async function jolpicaFetch(path: string) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "User-Agent": "SportsHub",
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status} al obtener ${path}`);
  }

  return response.json();
}

export async function getDriverStandings(season = "current"): Promise<F1DriverStanding[]> {
  "use cache";
  cacheLife("hours");

  const data = await jolpicaFetch(`/${season}/driverstandings/`);
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
  "use cache";
  cacheLife("hours");

  const data = await jolpicaFetch(`/${season}/constructorstandings/`);
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
  "use cache";
  cacheLife("hours");
  
  const data = await jolpicaFetch("/" + season + "/?limit=100");
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

export async function getDriverResults(driverId: string, season = "current"): Promise<F1RaceResult[]> {
  "use cache";
  cacheLife("hours");

  const data = await jolpicaFetch(
    `/${season}/drivers/${driverId}/results/?limit=100`
  );
  const races = data.MRData.RaceTable.Races;

  if (!races || races.length === 0) return [];

  return races.map((r: any): F1RaceResult => ({
    season: Number(r.season),
    round: Number(r.round),
    raceName: r.raceName,
    position: Number(r.Results[0].position),
    points: Number(r.Results[0].points),
    grid: Number(r.Results[0].grid),
    status: r.Results[0].status,
  }));
}