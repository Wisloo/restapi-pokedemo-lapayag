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

// register radar components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function StatsChart({ pokemon }) {
  const labels = pokemon.stats.map((s) => s.stat.name);
  const values = pokemon.stats.map((s) => s.base_stat);

  const maxStat = Math.max(...values, 100);
  const suggestedMax = Math.ceil(maxStat / 10) * 10 + 10;

  const data = {
    labels,
    datasets: [
      {
        label: pokemon.name,
        data: values,
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "rgba(59,130,246,1)",
        pointBackgroundColor: "rgba(59,130,246,1)",
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
        ticks: { beginAtZero: true },
      },
    },
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <h3 className="text-xl font-semibold capitalize mb-3">Stats for {pokemon.name}</h3>

      <div className="flex gap-4 items-start">
        <div className="w-1/2 h-64">
          <Radar data={data} options={options} />
        </div>

        <div className="w-1/2">
          <ul className="space-y-3 text-sm">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name}>
                <div className="flex justify-between">
                  <span className="capitalize">{s.stat.name.replace("-", " ")}</span>
                  <span className="font-semibold">{s.base_stat}</span>
                </div>

                <div className="h-2 bg-gray-200 rounded mt-1 overflow-hidden">
                  <div
                    style={{ width: `${(s.base_stat / suggestedMax) * 100}%` }}
                    className="h-full bg-blue-500"
                    aria-hidden="true"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}