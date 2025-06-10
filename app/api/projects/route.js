// app/api/projects/route.js
import { NextResponse } from "next/server";
import { addProject, getProject } from "@/lib/firestore";

export async function POST(req) {
  const body = await req.json();
  const { pid, data } = body;

  try {
    await addProject(pid, data);
    return NextResponse.json({ status: "success", pid });
  } catch (err) {
    return NextResponse.json({ status: "error", message: err.message });
  }
}
