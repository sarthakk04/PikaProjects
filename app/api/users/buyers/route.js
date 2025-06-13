// app/api/projects/route.js
import { NextResponse } from "next/server";
import { addBuyer } from "@/lib/firestore";

export async function POST(req) {
  const body = await req.json();
  const { bid, data } = body;

  try {
    await addBuyer(bid, data);
    return NextResponse.json({ status: "success", bid });
  } catch (err) {
    return NextResponse.json({ status: "error", message: err.message });
  }
}
