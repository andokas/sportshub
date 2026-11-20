export const SPORTS = [
  { slug: "football", name: "Fútbol", emoji: "⚽" },
  { slug: "nba", name: "NBA", emoji: "🏀" },
  { slug: "f1", name: "Fórmula 1", emoji: "🏎️" },
] as const;

export function getSport(slug: string) {
  return SPORTS.find((s) => s.slug === slug);
}