"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/f1/drivers", label: "Pilotos" },
  { href: "/f1/teams", label: "Equipos" },
  { href: "/f1/calendar", label: "Calendario" },
];

export default function F1Tabs() {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex gap-4 border-b border-gray-800">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={ pathname === tab.href ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-300" }
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}