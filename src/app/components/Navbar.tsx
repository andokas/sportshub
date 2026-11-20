import Link from "next/link";
import { SPORTS } from "@/lib/sports";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-6 border-b border-gray-200 px-6 py-4">
      <Link href="/" className="text-xl font-bold">
        SportsHub
      </Link>
      {SPORTS.map((s) => (
        <Link
          key={s.slug}
          href={`/${s.slug}`}
          className="text-gray-600 hover:text-black"
        >
          {s.emoji} {s.name}
        </Link>
      ))}
    </nav>
  );
}