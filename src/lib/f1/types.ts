export type F1Driver = {
    id: string;
    number: number | null;
    code: string;
    name: string;
    surname: string;
    dateOfBirth: string;
    nationality: string;
};

export type F1Team = {
    id: string;
    name: string;
    nationality: string;
};

export type F1Circuit = {
    circuitId: string;
    circuitName: string;
    location: {
        lat: number;
        long: number;
        locality: string;
        country: string;
    };
};

export type F1DriverStanding = {
    position: number | null;
    points: number;
    wins: number;
    driver: F1Driver;
    team: F1Team;
    teams: F1Team[];
};

export type F1TeamStanding = {
    position: number | null;
    points: number;
    wins: number;
    team: F1Team;
};

export type F1RaceList = {
    season: string;
    round: number;
    raceName: string;
    Circuit: F1Circuit;
    date: string;
    time: string;
};

export type F1RaceResult = {
    season: number;
    round: number;
    raceName: string;
    position: number;
    points: number;
    grid: number;
    status: string;
    finished: boolean;
    finishLabel: string;
    team: { id: string; name: string };
    shared: boolean;
}

export type F1SprintResult = {
  round: number;
  position: number;
  points: number;
};

export type F1DriverStats = {
  races: number;
  podiums: number;
  dnfs: number;
  bestFinish: number | null;
  avgGrid: number | null;
  avgFinish: number | null;
  positionsGained: number;
};

export type CompareRow = {
  label: string;
  a: number | null;
  b: number | null;
  better: "higher" | "lower" | "none";
  decimals?: number;
};

export type CumulativePoint = {
  round: number;
  raceName: string;
  pointsA: number;
  pointsB: number;
};