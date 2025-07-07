"use client";

import { useState, useEffect } from "react";
import PieChart from "../components/PieChart";

export default function PortfolioPage() {
  const [coins, setCoins] = useState([]);
  const [trades, setTrades] = useState([]);
  const [portfolio, setPortfolio] = useState({});
  const [coinMap, setCoinMap] = useState({});
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Fetch real-time prices
  const fetchCoins = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100"
    );
    const data = await res.json();
    const map = {};
    data.forEach((c) => (map[c.name] = c));
    setCoins(data);
    setCoinMap(map);
  };

  // Fetch trades from your MongoDB
  const fetchTrades = async () => {
    const res = await fetch("/api/trade");
    const data = await res.json();
    setTrades(data);
  };

  useEffect(() => {
    fetchCoins();
    fetchTrades();
  }, []);

  useEffect(() => {
    // Group trades by coin
    const result = {};
    trades.forEach((t) => {
      if (!result[t.coin]) result[t.coin] = 0;
      result[t.coin] += t.action === "buy" ? t.amount : -t.amount;
    });
    setPortfolio(result);
  }, [trades]);

  const totalValue = Object.entries(portfolio).reduce((sum, [coinName, qty]) => {
    const coin = coinMap[coinName];
    return coin ? sum + qty * coin.current_price : sum;
  }, 0);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask not found");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      setWalletConnected(true);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">💼 My Crypto Portfolio</h1>

      {/* ✅ Connect Wallet Placeholder */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl font-bold">
          Total Holdings:{" "}
          <span className="text-green-400">
            ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </span>
        </p>
        {walletConnected ? (
          <p className="text-sm text-gray-400">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {/* ✅ Portfolio Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(portfolio)
          .filter(([_, qty]) => qty > 0)
          .map(([coinName, quantity]) => {
            const coin = coinMap[coinName];
            const usdValue = coin ? quantity * coin.current_price : 0;

            // Calculate profit/loss
            const buys = trades.filter((t) => t.coin === coinName && t.action === "buy");
            const avgBuyPrice =
              buys.reduce((sum, t) => sum + t.price * t.amount, 0) /
              buys.reduce((sum, t) => sum + t.amount, 0 || 1);

            const pl = usdValue - quantity * avgBuyPrice;
            const plColor = pl >= 0 ? "text-green-400" : "text-red-400";

            return (
              <div
                key={coinName}
                className="bg-white/10 p-4 rounded-lg border border-white/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  {coin?.image && (
                    <img src={coin.image} className="w-6 h-6 rounded-full" alt={coinName} />
                  )}
                  <h3 className="font-bold text-lg">{coinName}</h3>
                </div>
                <p className="text-gray-300">Quantity: {quantity.toFixed(6)}</p>
                <p className="text-green-400 font-semibold">
                  Value: ${usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
                <p className={`font-medium ${plColor}`}>
                  P/L: {pl >= 0 ? "+" : ""}
                  {pl.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
            );
          })}
      </div>

      {/* ✅ Pie Chart */}
      {Object.keys(portfolio).length > 0 && (
        <PieChart
          data={Object.entries(portfolio).reduce((acc, [coin, qty]) => {
            const c = coinMap[coin];
            if (c) acc[coin] = qty * c.current_price;
            return acc;
          }, {})}
        />
      )}

      {Object.keys(portfolio).length === 0 && (
        <p className="text-gray-400 mt-10">
          No trades yet. Once you start trading, your portfolio will appear here.
        </p>
      )}
    </div>
  );
}
