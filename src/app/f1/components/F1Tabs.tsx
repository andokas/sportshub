"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { f1Font } from "@/lib/fonts";
import { Suspense } from "react";

const TABS = [
  { href: "/f1/drivers", label: "Pilotos" },
  { href: "/f1/teams", label: "Equipos" },
  { href: "/f1/calendar", label: "Calendario" },
];

function F1TabsContent() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 border-b-[3px] border-[#171717] bg-[#f1f0ec]">
      <div className="flex flex-wrap gap-6 md:gap-10">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                group relative flex shrink-0 items-center gap-2
                py-4 transition-colors duration-200
                ${
                  isActive
                    ? "text-[#e10600]"
                    : "text-[#aaa9a3] hover:text-[#171717]"
                }
              `}
            >
              <span
                className={`
                  ${f1Font.className}
                  ${isActive ? "italic font-bold" : "not-italic font-normal"}
                  text-sm uppercase tracking-tight md:text-base
                `}
              >
                {tab.label}
              </span>

              <span
                className={`
                  absolute bottom-[-3px] left-0 h-[3px] w-full
                  bg-[#e10600] transition-transform duration-300
                  ${isActive ? "scale-x-100" : "scale-x-0"}
                  origin-left
                `}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default function F1Tabs() {
  return (
    <Suspense fallback={null}>
      <F1TabsContent />
    </Suspense>
  );
}