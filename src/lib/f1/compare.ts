import { CompareRow, F1DriverStats, CumulativePoint, F1RaceResult, F1SprintResult } from "./types";

export function getWinner(row: CompareRow): "a" | "b" | "tie" | null {
  if (row.better === "none") return null;
  if (row.a === null && row.b === null) return null;
  if (row.a === null) return "b";
  if (row.b === null) return "a";
  if (row.a === row.b) return "tie";

  const aWins = row.better === "higher" ? row.a > row.b : row.a < row.b;
  return aWins ? "a" : "b";
}

export function buildCompareRows(
  a: { position: number; points: number; wins: number; stats: F1DriverStats },
  b: { position: number; points: number; wins: number; stats: F1DriverStats }
): CompareRow[] {
  return [
    { label: "Position", a: a.position, b: b.position, better: "lower" },
    { label: "Points", a: a.points, b: b.points, better: "higher" },
    { label: "Wins", a: a.wins, b: b.wins, better: "higher" },
    { label: "Podiums", a: a.stats.podiums, b: b.stats.podiums, better: "higher" },
    { label: "Races", a: a.stats.races, b: b.stats.races, better: "none" },
    { label: "DNFs", a: a.stats.dnfs, b: b.stats.dnfs, better: "lower" },
    { label: "Best finish", a: a.stats.bestFinish, b: b.stats.bestFinish, better: "lower" },
    { label: "Avg. grid", a: a.stats.avgGrid, b: b.stats.avgGrid, better: "lower", decimals: 1 },
    { label: "Avg. finish", a: a.stats.avgFinish, b: b.stats.avgFinish, better: "lower", decimals: 1 },
    { label: "Positions gained", a: a.stats.positionsGained, b: b.stats.positionsGained, better: "higher" },
  ];
}

export function buildCumulativePoints(
  resultsA: F1RaceResult[],
  resultsB: F1RaceResult[],
  sprintsA: F1SprintResult[] = [],
  sprintsB: F1SprintResult[] = []
): CumulativePoint[] {
  const rounds = [
    ...new Set([...resultsA.map((r) => r.round), ...resultsB.map((r) => r.round)]),
  ].sort((x, y) => x - y);

  let pointsA = 0;
  let pointsB = 0;

  return rounds.map((round) => {
    const resultA = resultsA.find((r) => r.round === round);
    const resultB = resultsB.find((r) => r.round === round);

    pointsA +=
      (resultA?.points ?? 0) +
      (sprintsA.find((s) => s.round === round)?.points ?? 0);
    pointsB +=
      (resultB?.points ?? 0) +
      (sprintsB.find((s) => s.round === round)?.points ?? 0);

    return {
      round,
      raceName: resultA?.raceName ?? resultB?.raceName ?? "",
      pointsA,
      pointsB,
    };
  });
}