// api/projects/[pid]/route.js

import { NextResponse } from "next/server";
import { updateProject, deleteProject, getProject } from "@/lib/firestore";

export async function GET(req, { params }) {
  const { pid } = params;
  const project = await getProject(pid);
  if (!project)
    return NextResponse.json(
      { status: "error", message: "Not found" },
      { status: 404 }
    );
  return NextResponse.json({ status: "success", project });
}

export async function PUT(req, { params }) {
  const { pid } = params;
  const data = await req.json();
  try {
    await updateProject(pid, data);
    return NextResponse.json({ status: "success", message: "Project updated" });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  const { pid } = params;
  try {
    await deleteProject(pid);
    return NextResponse.json({ status: "success", message: "Project deleted" });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
