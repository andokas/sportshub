import { getFinishLabel, isFinished } from "./stats";
import { F1Driver, F1Team, F1Circuit, F1DriverStanding, F1TeamStanding, F1RaceList, F1RaceResult, F1SprintResult } from "./types";
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

export async function getDriverStandings(season: string): Promise<F1DriverStanding[]> {
  "use cache";
  cacheLife("hours");

  const data = await jolpicaFetch(`/${season}/driverstandings/`);
  const list = data.MRData.StandingsTable.StandingsLists[0];

  if (!list) {
    throw new Error("No se encontraron datos de clasificación para la temporada especificada");
  }
  
  const standings = list.DriverStandings;

  const driverStandings: F1DriverStanding[] = standings.map(async (s: any): Promise<F1DriverStanding> => {
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

      const teams: F1Team[] = s.Constructors.map((c: any): F1Team => ({
        id: c.constructorId,
        name: c.name,
        nationality: c.nationality,
      }));

      const results = await getDriverResults(driver.id, season);

      const totalPoints = results.reduce((sum, result) => sum + result.points, 0);

      return {
        position: toNumberOrNull(s.position),
        points: Number(totalPoints.toFixed(2)),
        wins: Number(s.wins),
        driver,
        team: teams[teams.length - 1], // Último equipo del piloto en la temporada
        teams,
      };
    }
  );

  return driverStandings;
}

export async function getTeamStandings(season: string): Promise<F1TeamStanding[]> {
  "use cache";
  cacheLife("hours");

  const data = await jolpicaFetch(`/${season}/constructorstandings/`);
  const list = data.MRData.StandingsTable.StandingsLists[0];

  if (!list) {
    if (season < "1958") {
      return []; // No hay datos de clasificación de equipos antes de 1958
    }
    else {
      throw new Error("No se encontraron datos de clasificación para la temporada especificada");
    }
  }

  const standings = list.ConstructorStandings;

  const teamStandings: F1TeamStanding[] = standings.map((s: any): F1TeamStanding => {
      const team: F1Team = {
        id: s.Constructor.constructorId,
        name: s.Constructor.name,
        nationality: s.Constructor.nationality,
      };

      return {
        position: toNumberOrNull(s.position),
        points: Number(s.points),
        wins: Number(s.wins),
        team
      };
    }
  );
  
  return teamStandings;
}

export async function getRaceCalendar(season: string): Promise<F1RaceList[]> {
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

export async function getDriverResults(driverId: string, season: string): Promise<F1RaceResult[]> {
  "use cache";
  cacheLife("hours");

  const data = await jolpicaFetch(
    `/${season}/drivers/${driverId}/results/?limit=100`
  );
  const races = data.MRData.RaceTable.Races;

  if (!races || races.length === 0) return [];

  return races.map((r: any): F1RaceResult => {
    const entries = r.Results;
    const shared = entries.length > 1;
    const main =
      entries.find((e: any) => isFinished(e.status)) ?? entries[0];
    const position = Number(main.position);

    return {
      season: Number(r.season),
      round: Number(r.round),
      raceName: r.raceName,
      position,
      points: entries.reduce((sum: number, e: any) => sum + Number(e.points), 0),
      grid: Number(main.grid),
      status: main.status,
      finished: isFinished(main.status),
      shared,
      finishLabel: shared ? "SHC" : getFinishLabel(main.status, position),
      team: {
        id: main.Constructor.constructorId,
        name: main.Constructor.name,
      },
    };
  });
}

export async function getDriverSprints(
  driverId: string,
  season = "current"
): Promise<F1SprintResult[]> {
  "use cache";
  cacheLife("hours");

  const data = await jolpicaFetch(
    `/${season}/drivers/${driverId}/sprint/?limit=100`
  );
  const races = data.MRData.RaceTable.Races;

  if (!races || races.length === 0) return [];

  return races.map((r: any): F1SprintResult => ({
    round: Number(r.round),
    position: Number(r.SprintResults[0].position),
    points: Number(r.SprintResults[0].points),
  }));
}

export async function getSeasons(): Promise<number[]> {
  "use cache";
  cacheLife("days");

  const data = await jolpicaFetch("/seasons/?limit=100");
  const seasons = data.MRData.SeasonTable.Seasons;
  return seasons.map((s: any) => Number(s.season)).sort((a: number, b: number) => b - a);
}

function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') {
  return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}   