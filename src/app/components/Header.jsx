"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
<Link href="/portfolio" className="hover:underline">Portfolio</Link>

const coins = ["BTC", "ETH", "SOL", "ADA", "XRP"];
const dummyPrices = {
  BTC: 60750.23,
  ETH: 3410.75,
  SOL: 152.12,
  ADA: 0.437,
  XRP: 0.52,
};

export default function Header() {
  const [prices, setPrices] = useState(dummyPrices);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const updated = { ...prev };
        for (let coin in updated) {
          let change = (Math.random() * 2 - 1).toFixed(2);
          updated[coin] = +(updated[coin] + parseFloat(change)).toFixed(2);
        }
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-6 py-4 backdrop-blur-lg bg-black/60 border-b border-white/10 shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-300 to-yellow-400 animate-pulse">
          ⚡CryptoLive
        </h1>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm font-semibold tracking-wide">
          {["Home", "Trade", "Portfolio", "History"].map((text) => (
            <Link
              key={text}
              href={`/${text.toLowerCase()}`}
              className="relative group text-white hover:text-green-300 transition"
            >
              {text}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-300 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Live Ticker */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="whitespace-nowrap text-sm text-gray-300 overflow-hidden w-full sm:w-auto"
        >
          {coins.map((coin) => (
            <span key={coin} className="mx-4">
              {coin}: <span className="text-green-400">${prices[coin]}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </motion.header>
  );
}
