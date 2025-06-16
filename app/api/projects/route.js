// // app/api/projects/route.js
// import { NextResponse } from "next/server";
// import { addProject, getAllProjects } from "@/lib/firestore";

// export async function POST(req) {
//   const body = await req.json();
//   const { pid, data } = body;

//   try {
//     await addProject(pid, data);
//     return NextResponse.json({ status: "success", pid });
//   } catch (err) {
//     return NextResponse.json({ status: "error", message: err.message });
//   }
// }


// export async function GET() {
//   try {
//     const projects = await getAllProjects();
//     return NextResponse.json({ status: "success", projects });
//   } catch (err) {
//     return NextResponse.json(
//       { status: "error", message: err.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { addProject, getAllProjects } from "@/lib/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.pid || !body.data) {
      return NextResponse.json(
        { status: "error", message: "Project ID and data are required" },
        { status: 400 }
      );
    }

    const { pid, data } = body;
    await addProject(pid, data);
    
    return NextResponse.json(
      { status: "success", pid },
      { status: 201 } // 201 Created for successful POST
    );
    
  } catch (err) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const projects = await getAllProjects();
    
    return NextResponse.json(
      { 
        status: "success", 
        data: projects // More consistent naming
      },
      { status: 200 }
    );
    
  } catch (err) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json(
      { 
        status: "error", 
        message: err.message || "Failed to fetch projects"
      },
      { status: 500 }
    );
  }
}
