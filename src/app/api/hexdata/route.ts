import { NextResponse } from 'next/server';
import clientPromise from "../../../lib/mongoclient";

export async function POST(request: Request) {
  const data = await request.json();
  const { hexId } = data;

  try {
    const client = await clientPromise;
    const db = client.db('main');
    const collection = db.collection('devices');
    const miners = await collection.find({ hexId: hexId }).toArray();

    return NextResponse.json({ message: "ok", miners: miners });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}