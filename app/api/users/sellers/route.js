// app/api/projects/route.js
import { NextResponse } from "next/server";
import { addSeller } from "@/lib/firestore";

export async function POST(req) {
  const body = await req.json();
  const { sid, data } = body;

  try {
    await addSeller(sid, data);
    return NextResponse.json({ status: "success", sid });
  } catch (err) {
    return NextResponse.json({ status: "error", message: err.message });
  }
}
