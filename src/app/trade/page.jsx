// "use client";

// import { useState, useEffect } from "react";
// import CoinChart from "../components/CoinChart"; // ✅ Make sure this path is correct
// import "chartjs-adapter-date-fns";

// export default function TradePage() {
//   const [coins, setCoins] = useState([]);
//   const [selected, setSelected] = useState("bitcoin");
//   const [amount, setAmount] = useState("");
//   const [action, setAction] = useState("buy");
//   const [trades, setTrades] = useState([]);
//   const [prevMarket, setPrevMarket] = useState([]);

//   // ✅ Fetch real-time market data
//   const fetchCoins = async () => {
//     const res = await fetch(
//       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10"
//     );
//     const data = await res.json();
//     setPrevMarket(coins);
//     setCoins(data);
//   };

//   useEffect(() => {
//     fetchCoins();
//     const interval = setInterval(fetchCoins, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   // ✅ Fetch trade history
//   const fetchTrades = async () => {
//     const res = await fetch("/api/trade");
//     const data = await res.json();
//     setTrades(data);
//   };

//   useEffect(() => {
//     fetchTrades();
//     const interval = setInterval(fetchTrades, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // ✅ Confirm buy/sell trade
//   const handleTrade = async () => {
//     const coin = coins.find((c) => c.id === selected);
//     if (!coin) return;

//     const body = {
//       coin: coin.name,
//       action,
//       amount: parseFloat(amount),
//       price: coin.current_price,
//     };

//     const res = await fetch("/api/trade", {
//       method: "POST",
//       body: JSON.stringify(body),
//     });

//     if (res.ok) {
//       setAmount("");
//       fetchTrades();
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-black text-white">
//       <h1 className="text-3xl font-bold mb-8">💹 Live Trade Terminal</h1>

//       {/* ✅ Market Positions Table */}
//       <div className="overflow-x-auto border border-white/10 rounded-lg shadow-lg mb-10">
//         <h2 className="text-2xl font-semibold mb-4 p-4">📈 Market Positions</h2>
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-white/10 text-gray-300 uppercase text-xs">
//             <tr>
//               <th className="p-3">Coin</th>
//               <th className="p-3">Price</th>
//               <th className="p-3">24h Change</th>
//               <th className="p-3">Volume</th>
//               <th className="p-3">Market Cap</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white/5">
//             {coins.map((coin) => {
//               const changeColor =
//                 coin.price_change_percentage_24h > 0
//                   ? "text-green-400"
//                   : "text-red-400";

//               return (
//                 <tr
//                   key={coin.id}
//                   className="border-t border-white/10 hover:bg-white/10 transition"
//                 >
//                   <td className="p-3 flex items-center gap-2">
//                     <img
//                       src={coin.image}
//                       alt={coin.name}
//                       className="w-5 h-5 rounded-full"
//                     />
//                     <div>
//                       <div className="font-semibold">{coin.name}</div>
//                       <div className="text-gray-400 text-xs">
//                         {coin.symbol.toUpperCase()}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-3">${coin.current_price.toLocaleString()}</td>
//                   <td className={`p-3 ${changeColor}`}>
//                     {coin.price_change_percentage_24h?.toFixed(2)}%
//                   </td>
//                   <td className="p-3">
//                     ${(coin.total_volume / 1_000_000).toFixed(2)}M
//                   </td>
//                   <td className="p-3">
//                     ${(coin.market_cap / 1_000_000_000).toFixed(2)}B
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ Trade Panel */}
//       <div className="bg-white/5 p-6 rounded-lg mb-10">
//         <h2 className="text-2xl font-semibold mb-4">🛒 Place a Trade</h2>
//         <div className="flex gap-4 flex-wrap items-center">
//           <select
//             value={selected}
//             onChange={(e) => setSelected(e.target.value)}
//             className="bg-black border border-white/10 px-4 py-2 rounded"
//           >
//             {coins.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name} (${c.current_price})
//               </option>
//             ))}
//           </select>

//           <input
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="bg-black border px-4 py-2 rounded border-white/10"
//           />

//           <select
//             value={action}
//             onChange={(e) => setAction(e.target.value)}
//             className="bg-black border border-white/10 px-4 py-2 rounded"
//           >
//             <option value="buy">Buy</option>
//             <option value="sell">Sell</option>
//           </select>

//           <button
//             onClick={handleTrade}
//             className="bg-green-500 text-black font-bold px-6 py-2 rounded hover:bg-green-400 transition"
//           >
//             Confirm Trade
//           </button>
//         </div>
//       </div>

//       {/* ✅ LIVE CHART for Selected Coin */}
//       <CoinChart coinId={selected} />

//       {/* ✅ Trade History */}
//       <h2 className="text-2xl font-semibold mt-10 mb-4">📜 Trade History</h2>
//       <div className="space-y-2">
//         {trades.map((t) => (
//           <div
//             key={t._id}
//             className="bg-white/10 p-3 rounded border border-white/5"
//           >
//             <span className="font-bold text-green-300">
//               {t.action.toUpperCase()}
//             </span>{" "}
//             {t.amount} {t.coin} @ ${t.price} —{" "}
//             <span className="text-xs text-gray-400">
//               {new Date(t.createdAt).toLocaleString()}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import CoinChart from "../components/CoinChart";

export default function TradePage() {
  const [coins, setCoins] = useState([]);
  const [selected, setSelected] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState("buy");
  const [trades, setTrades] = useState([]);
  const [cart, setCart] = useState([]);
  const [wallet, setWallet] = useState({ USD: 10000 }); // local wallet

  // Fetch real-time coin data
  const fetchCoins = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20"
    );
    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchTrades = async () => {
    const res = await fetch("/api/trade");
    const data = await res.json();
    setTrades(data);
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  // ✅ Add trade to cart
  const handleAddToCart = () => {
    const coin = coins.find(c => c.id === selected);
    if (!coin || !amount) return;

    setCart(prev => [
      ...prev,
      {
        id: Date.now(),
        coin: coin.name,
        action,
        amount: parseFloat(amount),
        price: coin.current_price,
        total: parseFloat(amount) * coin.current_price,
      },
    ]);
    setAmount("");
  };

  // ✅ Confirm all cart trades
  const handleConfirmCart = async () => {
    for (const trade of cart) {
      await fetch("/api/trade", {
        method: "POST",
        body: JSON.stringify(trade),
      });

      // Local wallet balance change
      setWallet(prev => {
        const current = prev[trade.coin] || 0;
        if (trade.action === "buy") {
          return {
            ...prev,
            USD: prev.USD - trade.total,
            [trade.coin]: current + trade.amount,
          };
        } else {
          return {
            ...prev,
            USD: prev.USD + trade.total,
            [trade.coin]: current - trade.amount,
          };
        }
      });
    }

    setCart([]);
    fetchTrades();
  };

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">💹 Live Trade Terminal</h1>

      {/* 💼 Wallet */}
      <div className="bg-white/5 p-4 mb-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">💼 Wallet</h2>
        <p>USD: ${wallet.USD.toFixed(2)}</p>
        {Object.entries(wallet)
          .filter(([coin]) => coin !== "USD")
          .map(([coin, qty]) => (
            <p key={coin}>
              {coin}: {qty.toFixed(6)}
            </p>
          ))}
      </div>

      {/* 🛒 Trade Panel */}
      <div className="bg-white/5 p-6 rounded-lg mb-10">
        <h2 className="text-2xl font-semibold mb-4">🛒 Place a Trade</h2>
        <div className="flex gap-4 flex-wrap items-center">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="bg-black border border-white/10 px-4 py-2 rounded"
          >
            {coins.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} (${c.current_price})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-black border px-4 py-2 rounded border-white/10"
          />

          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="bg-black border border-white/10 px-4 py-2 rounded"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>

          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-black font-bold px-6 py-2 rounded hover:bg-blue-400 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* 📦 Cart List */}
      {cart.length > 0 && (
        <div className="bg-white/10 p-4 rounded-lg mb-10">
          <h2 className="text-xl font-bold mb-4">🧾 Confirm Your Orders</h2>
          <ul className="space-y-2">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white/5 p-3 rounded"
              >
                <div>
                  <span className="font-bold text-green-300">{item.action.toUpperCase()}</span>{" "}
                  {item.amount} {item.coin} @ ${item.price} = ${item.total.toFixed(2)}
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleConfirmCart}
            className="mt-4 bg-green-500 text-black px-4 py-2 rounded font-bold hover:bg-green-400"
          >
            Confirm All Trades
          </button>
        </div>
      )}

      {/* 🪙 Coin Chart */}
      <CoinChart coinId={selected} />

      {/* 📜 Trade History */}
      <h2 className="text-2xl font-semibold mb-4 mt-10">📜 Trade History</h2>
      <div className="space-y-2">
        {trades.map((t) => (
          <div
            key={t._id}
            className="bg-white/10 p-3 rounded border border-white/5"
          >
            <span className="font-bold text-green-300">{t.action.toUpperCase()}</span>{" "}
            {t.amount} {t.coin} @ ${t.price} —{" "}
            <span className="text-xs text-gray-400">
              {new Date(t.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
