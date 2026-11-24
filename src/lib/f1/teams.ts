const TEAM_COLORS: Record<string, string> = {
  mercedes: "#27F4D2",
  ferrari: "#E8002D",
  red_bull: "#3671C6",
  mclaren: "#FF8000",
  rb: "#6692FF",
  alpine: "#FF87BC",
  haas: "#B6BABD",
  audi: "#B00020",
  williams: "#64C4FF",
  aston_martin: "#229971",
  cadillac: "#1F1F1F",
};

export function getTeamColor(teamId: string) {
  return TEAM_COLORS[teamId] ?? "#9ca3af";
}