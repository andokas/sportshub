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

export type F1DriverStanding = {
    position: number;
    points: number;
    wins: number;
    driver: F1Driver;
    team: F1Team;
};
