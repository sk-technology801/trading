'use client';

import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

export default function TradePage() {
  const [type, setType] = useState('buy');
  const [coin, setCoin] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [wallet, setWallet] = useState('');
  const [price, setPrice] = useState('0');
  const [priceHistory, setPriceHistory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Fetch Current Price
  const fetchPrice = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
      );
      const data = await res.json();
      const livePrice = data[coin]?.usd?.toFixed(2) || '0';
      setPrice(livePrice);

      // Add to price history
      setPriceHistory(prev => [...prev.slice(-20), { time: new Date().toLocaleTimeString(), price: parseFloat(livePrice) }]);
    } catch (err) {
      console.error('Failed to fetch price:', err);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 10000);
    return () => clearInterval(interval);
  }, [coin]);

  const total = amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : '0.00';

  // 2. Save Trade to API
  const handleTrade = async () => {
    if (!wallet || !amount) {
      alert('Please fill all fields.');
      return;
    }

    const trade = {
      type,
      coin: coin.toUpperCase(),
      amount,
      total,
      wallet,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trade),
      });

      if (res.ok) {
        setOrders([trade, ...orders]);
        setAmount('');
        setSuccessMsg(`✅ ${type.toUpperCase()} confirmed!`);
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        alert('❌ Failed to save trade');
      }
    } catch (err) {
      console.error('Trade failed:', err);
      alert('❌ Server error.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-[#0f0f1f] text-white pt-28 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-4xl font-bold mb-6 text-neon">⚡ Crypto Trade</h1>

        {/* Alert */}
        {successMsg && (
          <div className="bg-green-600/90 py-2 px-4 rounded-lg text-center mb-4 animate-fade-in">
            {successMsg}
          </div>
        )}

        {/* Buy/Sell Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          {['buy', 'sell'].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-6 py-2 rounded-full text-sm font-semibold ${
                type === t ? (t === 'buy' ? 'bg-green-600' : 'bg-red-600') : 'bg-white/10 text-gray-300'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="bg-[#111827]/70 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8 space-y-5">
          <div>
            <label className="text-sm mb-1 block">Select Coin</label>
            <select
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-white/10 rounded text-white"
            >
              <option value="bitcoin">Bitcoin (BTC)</option>
              <option value="ethereum">Ethereum (ETH)</option>
              <option value="solana">Solana (SOL)</option>
              <option value="dogecoin">Dogecoin (DOGE)</option>
            </select>
          </div>

          <div>
            <label className="text-sm mb-1 block">Wallet Address</label>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="0xYourWallet"
              className="w-full px-4 py-2 bg-black border border-white/10 rounded text-white"
            />
          </div>

          <div>
            <label className="text-sm mb-1 block">Amount</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 bg-black border border-white/10 rounded text-white"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <span>Live Price:</span>
            <span className="text-neon font-semibold">${price}</span>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span>Total {type === 'buy' ? 'Cost' : 'Return'}:</span>
            <span className="text-neon">${total}</span>
          </div>

          <button
            onClick={handleTrade}
            className={`w-full py-3 rounded text-white font-semibold ${
              type === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Confirm {type.toUpperCase()}
          </button>
        </div>

        {/* Graph */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-2">📊 Price Trend (Last 20 updates)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={priceHistory}>
              <XAxis dataKey="time" tick={{ fill: 'white', fontSize: 12 }} />
              <YAxis tick={{ fill: 'white' }} />
              <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #00ffc6' }} />
              <Line type="monotone" dataKey="price" stroke="#00ffc6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* History */}
        {orders.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">🧾 Order History</h2>
            <div className="space-y-2 border-t border-white/10 pt-4">
              {orders.map((o, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row justify-between bg-white/5 px-4 py-3 rounded-md text-sm"
                >
                  <div>
                    <b>{o.type.toUpperCase()}</b> {o.amount} {o.coin}
                  </div>
                  <div>Total: ${o.total}</div>
                  <div className="text-gray-400">{new Date(o.date).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
