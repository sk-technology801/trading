// models/Trade.js
import mongoose from 'mongoose';

const TradeSchema = new mongoose.Schema(
  {
    coin: String,
    action: String, // 'buy' or 'sell'
    amount: Number,
    price: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Trade || mongoose.model('Trade', TradeSchema);
