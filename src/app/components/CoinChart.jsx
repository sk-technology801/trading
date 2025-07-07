"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(LineElement, TimeScale, LinearScale, PointElement, Tooltip, Legend);

export default function CoinChart({ coinId }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!coinId) return;
    const fetchChartData = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`
      );
      const data = await res.json();
      const prices = data.prices.map(([time, price]) => ({
        x: time,
        y: price,
      }));
      setChartData({
        datasets: [
          {
            label: `${coinId} Price (7d)`,
            data: prices,
            fill: true,
            borderColor: "#00ff99",
            backgroundColor: "rgba(0,255,153,0.1)",
            tension: 0.3,
            pointRadius: 0,
          },
        ],
      });
    };
    fetchChartData();
  }, [coinId]);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        ticks: {
          color: "#ccc",
        },
        grid: {
          color: "#222",
        },
      },
      y: {
        ticks: {
          color: "#ccc",
        },
        grid: {
          color: "#222",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 mt-8">
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-400">Loading chart...</p>
      )}
    </div>
  );
}
