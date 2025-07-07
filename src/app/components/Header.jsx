'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = ['Markets', 'Trade', 'Portfolio', 'News'];

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0c0f2f] to-[#000000] border-b border-purple-900/20 shadow-md backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-widest text-cyan-400 drop-shadow-md">
          <span className="text-purple-500">Crypto</span>
          <span className="text-white">Trade</span>
          <span className="text-cyan-400">.pro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.div key={link} whileHover={{ scale: 1.1 }} className="group relative">
              <Link
                href={`/${link.toLowerCase()}`}
                className="text-white font-medium transition hover:text-cyan-400"
              >
                {link}
                <span className="block w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
          ))}

          <Link
            href="/buy"
            className="px-4 py-2 rounded-md bg-gradient-to-br from-green-400 to-emerald-600 text-black font-semibold shadow hover:scale-105 transition"
          >
            Buy
          </Link>
          <Link
            href="/sell"
            className="px-4 py-2 rounded-md bg-gradient-to-br from-pink-500 to-red-600 text-white font-semibold shadow hover:scale-105 transition"
          >
            Sell
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden text-white">
          <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#0d0d1f] border-t border-purple-800/30 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="block text-white text-lg hover:text-cyan-400"
              onClick={() => setIsMobileOpen(false)}
            >
              {link}
            </Link>
          ))}
          <Link
            href="/buy"
            className="block bg-green-400 text-black px-4 py-2 rounded-md font-semibold"
            onClick={() => setIsMobileOpen(false)}
          >
            Buy
          </Link>
          <Link
            href="/sell"
            className="block bg-red-600 text-white px-4 py-2 rounded-md font-semibold"
            onClick={() => setIsMobileOpen(false)}
          >
            Sell
          </Link>
        </div>
      )}
    </header>
  );
}
