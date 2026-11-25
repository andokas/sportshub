import { Suspense } from "react";
import { getSeasons } from "@/lib/f1/api";
import F1Tabs from "./components/F1Tabs";
import SeasonSelector from "./components/SeasonSelector";

async function Seasons() {
  const seasons = await getSeasons();
  return <SeasonSelector seasons={seasons} />;
}

export default function F1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f1f0ec] text-[#171717]">
      <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">🏎️ Fórmula 1</h1>
          <Suspense fallback={<div className="h-10 w-24" />}>
            <Seasons />
          </Suspense>
        </div>
        <F1Tabs />
        <div className="min-w-0">{children}</div>
      </main>
    </div>
  );
}