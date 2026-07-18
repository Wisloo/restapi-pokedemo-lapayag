"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Radar } from "react-chartjs-2";
import type { Pokemon } from "@/types/pokemon";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface StatsChartProps {
  pokemon: Pokemon;
  typeColor: string;
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "59,130,246";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}

const statDisplayNames: Record<string, string> = {
  "hp": "HP",
  "attack": "Attack",
  "defense": "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  "speed": "Speed",
};

export default function StatsChart({ pokemon, typeColor }: StatsChartProps) {
  const labels = pokemon.stats.map(
    (s) => statDisplayNames[s.stat.name] ?? s.stat.name
  );
  const values = pokemon.stats.map((s) => s.base_stat);

  const maxStat = Math.max(...values, 100);
  const suggestedMax = Math.ceil(maxStat / 10) * 10 + 10;
  const rgb = hexToRgb(typeColor);

  const data = {
    labels,
    datasets: [
      {
        label: pokemon.name,
        data: values,
        backgroundColor: `rgba(${rgb},0.15)`,
        borderColor: typeColor,
        pointBackgroundColor: typeColor,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: typeColor,
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax,
        ticks: {
          stepSize: 20,
          font: { size: 10 },
          color: "#9CA3AF",
          backdropColor: "transparent",
        },
        grid: {
          color: "rgba(156,163,175,0.2)",
        },
        angleLines: {
          color: "rgba(156,163,175,0.2)",
        },
        pointLabels: {
          font: { size: 11, weight: "bold" as const },
          color: "#6B7280",
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  const total = values.reduce((a, b) => a + b, 0);
  const avg = (total / values.length).toFixed(1);

  return (
    <div>
      <div className="h-56 mb-6">
        <Radar data={data} options={options} />
      </div>

      <div className="space-y-3">
        {pokemon.stats.map((s) => {
          const displayName =
            statDisplayNames[s.stat.name] ?? s.stat.name.replace("-", " ");
          const pct = Math.min((s.base_stat / suggestedMax) * 100, 100);

          return (
            <div key={s.stat.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  {displayName}
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {s.base_stat}
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: typeColor,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">Total</span>
        <span className="font-bold text-gray-900 dark:text-white">{total}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">Average</span>
        <span className="font-bold text-gray-900 dark:text-white">{avg}</span>
      </div>
    </div>
  );
}
