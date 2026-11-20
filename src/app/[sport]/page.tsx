import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSport, SPORTS } from "@/lib/sports";

export function generateStaticParams() {
  return SPORTS.map((s) => ({ sport: s.slug }));
}

async function SportContent({
  params,
}: {
  params: Promise<{ sport: string }>;
}) {
  const { sport: slug } = await params;
  const sport = getSport(slug);
  if (!sport) notFound();

  return (
    <>
      <h1 className="text-3xl font-bold">
        {sport.emoji} {sport.name}
      </h1>
      <p className="mt-2 text-gray-600">
        Aquí irán clasificaciones y estadísticas.
      </p>
    </>
  );
}

export default function SportPage({
  params,
}: {
  params: Promise<{ sport: string }>;
}) {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <Suspense fallback={<p>Cargando...</p>}>
        <SportContent params={params} />
      </Suspense>
    </main>
  );
}