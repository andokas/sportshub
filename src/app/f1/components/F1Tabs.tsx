"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { f1Font } from "@/lib/fonts";

const TABS = [
  { slug: "drivers", label: "Drivers" },
  { slug: "teams", label: "Teams" },
  { slug: "calendar", label: "Calendar" },
  { slug: "compare", label: "Compare" },
];

function TabsList({ season, section }: { season: string; section?: string }) {
  return (
    <nav className="mb-8 border-b-[3px] border-[#171717]">
      <div className="flex flex-wrap gap-6 md:gap-10">
        {TABS.map((tab) => {
          const isActive = section === tab.slug;

          return (
            <Link
              key={tab.slug}
              href={`/f1/${season}/${tab.slug}`}
              className={`group relative flex shrink-0 items-center gap-2 py-4 transition-colors duration-200 ${
                isActive
                  ? "text-[#e10600]"
                  : "text-[#aaa9a3] hover:text-[#171717]"
              }`}
            >
              <span
                className={`${f1Font.className} ${
                  isActive ? "font-bold italic" : "font-normal not-italic"
                } text-sm uppercase tracking-tight md:text-base`}
              >
                {tab.label}
              </span>

              <span
                className={`absolute bottom-[-3px] left-0 h-[3px] w-full origin-left bg-[#e10600] transition-transform duration-300 ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function F1TabsContent() {
  const pathname = usePathname();
  // "/f1/2021/drivers/max_verstappen" → ["", "f1", "2021", "drivers", "max_verstappen"]
  const segments = pathname.split("/");
  const season = segments[2] || "current";
  const section = segments[3];

  return <TabsList season={season} section={section} />;
}

export default function F1Tabs() {
  return (
    <Suspense fallback={<TabsList season="current" />}>
      <F1TabsContent />
    </Suspense>
  );
}