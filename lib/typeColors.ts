export interface TypeColorConfig {
  bg: string;
  gradient: string;
  text: string;
  badge: string;
  statBar: string;
}

export const typeColors: Record<string, TypeColorConfig> = {
  normal: {
    bg: "bg-[#A8A77A]",
    gradient: "from-[#A8A77A] to-[#C6C3A4]",
    text: "text-white",
    badge: "bg-[#A8A77A] text-white",
    statBar: "#A8A77A",
  },
  fire: {
    bg: "bg-[#EE8130]",
    gradient: "from-[#EE8130] to-[#F7B874]",
    text: "text-white",
    badge: "bg-[#EE8130] text-white",
    statBar: "#EE8130",
  },
  water: {
    bg: "bg-[#6390F0]",
    gradient: "from-[#6390F0] to-[#94BBF8]",
    text: "text-white",
    badge: "bg-[#6390F0] text-white",
    statBar: "#6390F0",
  },
  electric: {
    bg: "bg-[#F7D02C]",
    gradient: "from-[#F7D02C] to-[#FAE882]",
    text: "text-gray-900",
    badge: "bg-[#F7D02C] text-gray-900",
    statBar: "#F7D02C",
  },
  grass: {
    bg: "bg-[#7AC74C]",
    gradient: "from-[#7AC74C] to-[#A6DB7D]",
    text: "text-white",
    badge: "bg-[#7AC74C] text-white",
    statBar: "#7AC74C",
  },
  ice: {
    bg: "bg-[#96D9D6]",
    gradient: "from-[#96D9D6] to-[#C2EFE9]",
    text: "text-gray-900",
    badge: "bg-[#96D9D6] text-gray-900",
    statBar: "#96D9D6",
  },
  fighting: {
    bg: "bg-[#C22E28]",
    gradient: "from-[#C22E28] to-[#E06460]",
    text: "text-white",
    badge: "bg-[#C22E28] text-white",
    statBar: "#C22E28",
  },
  poison: {
    bg: "bg-[#A33EA1]",
    gradient: "from-[#A33EA1] to-[#C87AC4]",
    text: "text-white",
    badge: "bg-[#A33EA1] text-white",
    statBar: "#A33EA1",
  },
  ground: {
    bg: "bg-[#E2BF65]",
    gradient: "from-[#E2BF65] to-[#F0D998]",
    text: "text-gray-900",
    badge: "bg-[#E2BF65] text-gray-900",
    statBar: "#E2BF65",
  },
  flying: {
    bg: "bg-[#A98FF3]",
    gradient: "from-[#A98FF3] to-[#C8B6F8]",
    text: "text-white",
    badge: "bg-[#A98FF3] text-white",
    statBar: "#A98FF3",
  },
  psychic: {
    bg: "bg-[#F95587]",
    gradient: "from-[#F95587] to-[#FB93A8]",
    text: "text-white",
    badge: "bg-[#F95587] text-white",
    statBar: "#F95587",
  },
  bug: {
    bg: "bg-[#A6B91A]",
    gradient: "from-[#A6B91A] to-[#C8D44C]",
    text: "text-white",
    badge: "bg-[#A6B91A] text-white",
    statBar: "#A6B91A",
  },
  rock: {
    bg: "bg-[#B6A136]",
    gradient: "from-[#B6A136] to-[#D4C466]",
    text: "text-white",
    badge: "bg-[#B6A136] text-white",
    statBar: "#B6A136",
  },
  ghost: {
    bg: "bg-[#735797]",
    gradient: "from-[#735797] to-[#9B82B8]",
    text: "text-white",
    badge: "bg-[#735797] text-white",
    statBar: "#735797",
  },
  dragon: {
    bg: "bg-[#6F35FC]",
    gradient: "from-[#6F35FC] to-[#9B7FFC]",
    text: "text-white",
    badge: "bg-[#6F35FC] text-white",
    statBar: "#6F35FC",
  },
  dark: {
    bg: "bg-[#705746]",
    gradient: "from-[#705746] to-[#9A806E]",
    text: "text-white",
    badge: "bg-[#705746] text-white",
    statBar: "#705746",
  },
  steel: {
    bg: "bg-[#B7B7CE]",
    gradient: "from-[#B7B7CE] to-[#D4D4E6]",
    text: "text-gray-900",
    badge: "bg-[#B7B7CE] text-gray-900",
    statBar: "#B7B7CE",
  },
  fairy: {
    bg: "bg-[#D685AD]",
    gradient: "from-[#D685AD] to-[#EABAD0]",
    text: "text-white",
    badge: "bg-[#D685AD] text-white",
    statBar: "#D685AD",
  },
};

export const defaultTypeColor: TypeColorConfig = {
  bg: "bg-gray-400",
  gradient: "from-gray-400 to-gray-500",
  text: "text-white",
  badge: "bg-gray-400 text-white",
  statBar: "#9CA3AF",
};

export function getTypeColor(typeName: string): TypeColorConfig {
  return typeColors[typeName] ?? defaultTypeColor;
}
