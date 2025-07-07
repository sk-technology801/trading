'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const localImages = {
  bitcoin: 'https://images.pexels.com/photos/843700/pexels-photo-843700.jpeg?_gl=1*cy0p2w*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTE4OTAxNTAkbzI2JGcxJHQxNzUxODkwMjUwJGo0NCRsMCRoMA..',
  ethereum: 'https://images.pexels.com/photos/14751274/pexels-photo-14751274.jpeg?_gl=1*1pziinv*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTE4OTAxNTAkbzI2JGcxJHQxNzUxODkwMzMwJGoyNCRsMCRoMA..',
  dogecoin: 'https://media.istockphoto.com/id/1774415211/photo/asian-business-woman-is-checking-bitcoin-or-stock-market-price-chart-on-the-digital-exchange.jpg?s=1024x1024&w=is&k=20&c=Ile3lDwz0Ikm8x3tHXTmq21Mp5uYSZ9XJw05juOVh60=',
  solana: 'https://images.pexels.com/photos/30572289/pexels-photo-30572289.jpeg?_gl=1*1w9linc*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTE4OTAxNTAkbzI2JGcxJHQxNzUxODkwNTA4JGozMiRsMCRoMA..',
  binancecoin: 'https://images.pexels.com/photos/1235971/pexels-photo-1235971.jpeg?_gl=1*3gp9z4*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTE4OTAxNTAkbzI2JGcxJHQxNzUxODkwNTUyJGo1MSRsMCRoMA..',
  cardano: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?_gl=1*1oxh59d*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTE4OTAxNTAkbzI2JGcxJHQxNzUxODkwNjAwJGozJGwwJGgw',
  polkadot: 'https://images.pexels.com/photos/6771672/pexels-photo-6771672.jpeg?_gl=1*2wrid3*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTE4OTAxNTAkbzI2JGcxJHQxNzUxODkwNjg3JGoxJGwwJGgw',
  litecoin: 'https://images.pexels.com/photos/30572289/pexels-photo-30572289.jpeg?_gl=1*funmle*_ga*MTU3NjA0MjQ0NS4xNzUwMzMyOTg3*_ga_8JE65Q40S6*czE3NTE4OTAxNTAkbzI2JGcxJHQxNzUxODkwNjQ5JGozOSRsMCRoMA..',
};

export default function MarketsPage() {
  const [coins, setCoins] = useState([]);
  const [previousPrices, setPreviousPrices] = useState({});

  const fetchMarketData = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin,solana,binancecoin,cardano,polkadot,litecoin'
      );
      const data = await res.json();

      // Save current prices for animation comparison
      const priceMap = {};
      data.forEach((coin) => {
        priceMap[coin.id] = coin.current_price;
      });

      setPreviousPrices((prev) => ({ ...prev, ...priceMap }));
      setCoins(data);
    } catch (err) {
      console.error('Error fetching coin data:', err);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 10000); // update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f1f] to-black text-white pt-32 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-extrabold mb-12 text-neon drop-shadow">
          🚀 Real-Time Crypto Market
        </h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {coins.map((coin) => {
            const prev = previousPrices[coin.id];
            const curr = coin.current_price;
            const priceUp = prev && curr > prev;
            const priceDown = prev && curr < prev;

            return (
              <div
                key={coin.id}
                className="group bg-[#111827]/70 border border-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:shadow-[0_0_20px_#00ffc6] transition duration-300"
              >
                {/* Glowing Icon */}
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-cyan-400/30 backdrop-blur-md flex items-center justify-center mb-3 transition group-hover:scale-110">
                    <img
                      src={localImages[coin.id]}
                      alt={coin.name}
                      className="w-8 h-8 drop-shadow-[0_0_8px_#00ffc6]"
                    />
                  </div>
                  <h2 className="text-lg font-bold">{coin.name}</h2>
                  <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
                </div>

                {/* Live Price with Animate Blink */}
                <div
                  className={`text-xl font-bold ${
                    priceUp
                      ? 'text-green-400 animate-pulse'
                      : priceDown
                      ? 'text-red-400 animate-pulse'
                      : 'text-neon'
                  }`}
                >
                  ${coin.current_price.toLocaleString()}
                </div>

                {/* % Change + Arrow */}
                <div className="flex justify-center items-center gap-2 mt-4">
                  <span
                    className={`font-medium ${
                      coin.price_change_percentage_24h > 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                  {coin.price_change_percentage_24h > 0 ? (
                    <ArrowUpRight className="text-green-400" />
                  ) : (
                    <ArrowDownRight className="text-red-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}