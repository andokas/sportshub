"use client";

import { useState } from "react";

export default function DriverPhoto({
  driverId,
  name,
  color,
  className = "",
}: {
  driverId: string;
  name: string;
  color: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center font-black text-white ${className}`}
        style={{ backgroundColor: color }}
        aria-label={name}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={`/f1/drivers/${driverId}.jpg`}
      alt={name}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}