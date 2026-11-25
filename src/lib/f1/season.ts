import { notFound } from "next/navigation";
import { getSeasons } from "./api";

// Acepta "current" o un año que exista en la API. Si no, 404.
export async function resolveSeason(param: string): Promise<string> {
  if (param === "current") return param;

  const year = Number(param);
  const seasons = await getSeasons();
  if (!seasons.includes(year)) notFound();

  return String(year);
}