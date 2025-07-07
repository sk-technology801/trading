import { connectDB } from "@/lib/db";
import Trade from "@/models/Trade";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const trade = await Trade.create(body);
    return Response.json({ success: true, trade });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const trades = await Trade.find().sort({ createdAt: -1 });
    return Response.json(trades);
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
