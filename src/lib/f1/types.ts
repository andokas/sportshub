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
    position: number;
    points: number;
    wins: number;
    driver: F1Driver;
    team: F1Team;
};

export type F1TeamStanding = {
    position: number;
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
    finishLabel: string;
}