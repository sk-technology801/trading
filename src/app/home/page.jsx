"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Optional Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 px-6 py-20 text-center max-w-7xl mx-auto">
        {/* Glitch Text Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 glitch"
        >
          TRADE <span className="text-green-400">LIVE</span> IN REAL-TIME
        </motion.h1>

        <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
          Live crypto prices. Lightning-fast execution. Real profit potential.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/trade"
            className="px-10 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl shadow-xl transition transform hover:scale-105"
          >
            Start Trading
          </Link>
          <Link
            href="/portfolio"
            className="px-10 py-3 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black rounded-xl transition transform hover:scale-105"
          >
            View Portfolio
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <section className="relative z-10 mt-28 max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Live Coins", value: "200+" },
          { label: "Daily Trades", value: "1M+" },
          { label: "Verified Users", value: "500K+" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 p-6 rounded-xl shadow-2xl hover:scale-105 transition"
          >
            <h3 className="text-4xl font-bold text-green-400">{stat.value}</h3>
            <p className="text-gray-300 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Features Section */}
      <section className="relative z-10 mt-32 text-center px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          Why Trade With <span className="text-green-400">CryptoLive</span>?
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 text-left">
          {[
            {
              title: "Real-Time Price Engine",
              desc: "Get blazing fast updates every second with live streaming prices from the top crypto markets.",
            },
            {
              title: "Advanced Portfolio Tools",
              desc: "Track your growth, manage multiple coins, and analyze profits easily.",
            },
            {
              title: "Secure & Verified",
              desc: "All trades are encrypted, and user funds are secured by multi-layered protection.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 * i }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:border-green-500 transition"
            >
              <h3 className="text-xl font-semibold text-green-300">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
<section className="relative z-10 mt-32 text-center px-6 py-16 bg-gradient-to-r from-green-500 via-cyan-500 to-teal-500 bg-opacity-10 rounded-xl shadow-xl max-w-4xl mx-auto border border-green-400/20">
  <motion.h2
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="text-3xl sm:text-4xl font-bold text-white mb-4"
  >
    Are you ready to trade smarter?
  </motion.h2>
  <Link
    href="/trade"
    className="mt-6 inline-block px-4 py-10 bg-green-400 text-black font-bold rounded-full shadow-xl hover:scale-105 transition"
  >
    Launch Terminal 🚀
  </Link>
</section>

    </main>
  );
}
