import { F1DriverStats, F1RaceResult } from "./types";

export function isFinished(status: string) {
  return (
    status === "Finished" ||
    status === "Lapped" ||
    /^\+\d+ Laps?$/.test(status)
  );
}

export function getFinishLabel(status: string, position: number) {
  if (isFinished(status)) return `P${position}`;
  if (status === "Did not start" || status === "DNS") return "DNS";
  if (status === "Disqualified" || status === "DSQ") return "DSQ";
  return "DNF";
}

export function computeDriverStats(results: F1RaceResult[]): F1DriverStats {
  const started = results.filter((r) => r.finishLabel !== "DNS");
  const finished = started.filter((r) => r.finished);
  const withGrid = started.filter((r) => r.grid > 0); // grid 0 = pit lane

  return {
    races: started.length,
    podiums: finished.filter((r) => r.position <= 3).length,
    dnfs: started.filter((r) => r.finishLabel === "DNF").length,
    bestFinish:
      finished.length > 0 ? Math.min(...finished.map((r) => r.position)) : null,
    avgGrid: average(withGrid.map((r) => r.grid)),
    avgFinish: average(finished.map((r) => r.position)),
    positionsGained: finished
      .filter((r) => r.grid > 0)
      .reduce((sum, r) => sum + (r.grid - r.position), 0),
  };
}

function average(nums: number[]): number | null {
  if (nums.length === 0) return null;

  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}