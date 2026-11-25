"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CumulativePoint } from "@/lib/f1/types";
import { f1Font } from "@/lib/fonts";

type Props = {
  data: CumulativePoint[];
  nameA: string;
  nameB: string;
  colorA: string;
  colorB: string;
};

export default function PointsChart({
  data,
  nameA,
  nameB,
  colorA,
  colorB,
}: Props) {
  if (data.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className={`${f1Font.className} mb-5 text-2xl font-black uppercase italic tracking-tight md:text-3xl`}>
        Points <span className="text-[#e10600]">Progression.</span>
      </h3>

      {/* Leyenda propia, para controlar el estilo */}
      <div className={`${f1Font.className} mb-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-black uppercase tracking-[0.15em]`}>
        <span className="flex items-center gap-2">
          <span className="h-1 w-6" style={{ backgroundColor: colorA }} />
          {nameA}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1 w-6" style={{ backgroundColor: colorB }} />
          {nameB}
        </span>
      </div>

      {/* El contenedor necesita una altura fija: ResponsiveContainer la hereda */}
      <div className="h-72 w-full bg-white p-3 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="#e4e3de" vertical={false} />
            <XAxis
              dataKey="round"
              tickLine={false}
              axisLine={{ stroke: "#171717" }}
              tick={{ fontSize: 11, fontWeight: 700, fill: "#6b7280" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              tick={{ fontSize: 11, fontWeight: 700, fill: "#6b7280" }}
            />
            <Tooltip
              cursor={{ stroke: "#171717", strokeWidth: 1 }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0].payload as CumulativePoint;

                return (
                  <div className="border-2 border-[#171717] bg-white p-3 text-xs">
                    <p className="mb-2 font-black uppercase tracking-wide">
                      R{String(point.round).padStart(2, "0")} · {point.raceName}
                    </p>
                    <p className="font-bold" style={{ color: colorA }}>
                      {nameA}: {point.pointsA}
                    </p>
                    <p className="font-bold" style={{ color: colorB }}>
                      {nameB}: {point.pointsB}
                    </p>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="pointsA"
              stroke={colorA}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="pointsB"
              stroke={colorB}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}