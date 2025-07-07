"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [trades, setTrades] = useState([]);

  // Fetch trades from backend
  const fetchTrades = async () => {
    const res = await fetch("/api/trade");
    const data = await res.json();
    setTrades(data.reverse()); // show newest first
  };

  useEffect(() => {
    fetchTrades();
    const interval = setInterval(fetchTrades, 5000); // auto-refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📜 Trade History</h1>

      {trades.length === 0 ? (
        <p className="text-gray-400">No trades yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/5 rounded-lg overflow-hidden text-sm">
            <thead className="bg-white/10 text-left uppercase text-gray-400 text-xs">
              <tr>
                <th className="p-3">Action</th>
                <th className="p-3">Coin</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Price</th>
                <th className="p-3">Total</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade._id} className="border-t border-white/10 hover:bg-white/10 transition">
                  <td className="p-3 font-bold text-green-400">
                    {trade.action.toUpperCase()}
                  </td>
                  <td className="p-3">{trade.coin}</td>
                  <td className="p-3">{trade.amount.toFixed(4)}</td>
                  <td className="p-3">${trade.price.toLocaleString()}</td>
                  <td className="p-3">
                    ${(trade.amount * trade.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-xs text-gray-400">
                    {new Date(trade.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
