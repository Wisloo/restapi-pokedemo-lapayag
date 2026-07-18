"use client";

import { getTypeColor } from "@/lib/typeColors";

interface TypeBadgeProps {
  type: string;
}

export default function TypeBadge({ type }: TypeBadgeProps) {
  const color = getTypeColor(type);

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${color.badge}`}
    >
      {type}
    </span>
  );
}
