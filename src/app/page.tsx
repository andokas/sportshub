import Link from "next/link";
import { SPORTS } from "@/lib/sports";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Elige un deporte</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {SPORTS.map((s) => (
          <Link
            key={s.slug}
            href={`/${s.slug}`}
            className="rounded-xl border p-6 text-center hover:bg-gray-50"
          >
            <div className="text-5xl">{s.emoji}</div>
            <div className="mt-2 text-lg font-semibold">{s.name}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}