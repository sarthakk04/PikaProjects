import { NextResponse } from "next/server";
import { getProject } from "@/lib/firestore";

// GET /api/projects/:pid
export async function GET(_, { params }) {
  const { pid } = await params;

  try {
    const project = await getProject(pid);

    if (!project) {
      return NextResponse.json(
        { status: "error", message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: "success", project });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
