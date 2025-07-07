"use client";

import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "USD Value",
        data: values,
        backgroundColor: [
          "#F7931A", // BTC
          "#627EEA", // ETH
          "#3EBA77", // SOL
          "#C2A633", // ADA
          "#BA9F33", // DOGE
          "#8884d8", // Others
        ],
      },
    ],
  };

  return (
    <div className="bg-white/5 p-4 rounded-lg mt-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">💹 Portfolio Breakdown</h2>
      <Pie data={chartData} />
    </div>
  );
}
