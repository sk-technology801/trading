import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(); // defaults to DB in URI
    const collection = db.collection('trades');

    const result = await collection.insertOne(body);
    return new Response(JSON.stringify({ success: true, id: result.insertedId }), {
      status: 201,
    });
  } catch (error) {
    console.error('Trade save error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to save trade' }), {
      status: 500,
    });
  }
}
