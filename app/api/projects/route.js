
// import { NextResponse } from "next/server";
// import { addProject, getAllProjects } from "@/lib/firestore";

// export async function POST(req) {
//   try {
//     const body = await req.json();
    
//     // Validate required fields based on your project schema
//     if (!body.p_name || !body.p_price || !body.p_category || !body.p_info) {
//       return NextResponse.json(
//         { 
//           status: "error", 
//           message: "Required fields: p_name, p_price, p_category, p_info" 
//         },
//         { status: 400 }
//       );
//     }

//     // Validate nested p_info structure
//     if (!body.p_info.Desc || !body.p_info.techstack || !body.p_info.media) {
//       return NextResponse.json(
//         { 
//           status: "error", 
//           message: "p_info must contain Desc, techstack, and media fields" 
//         },
//         { status: 400 }
//       );
//     }

//     // Generate ID automatically (better than requiring client to provide pid)
//     const pid = `P${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
//     // Create complete project object
//     const projectData = {
//       id: pid,
//       ...body,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString()
//     };

//     await addProject(pid, projectData);
    
//     return NextResponse.json(
//       { 
//         status: "success", 
//         pid,
//         data: projectData // Return the created project for confirmation
//       },
//       { status: 201 }
//     );
    
//   } catch (err) {
//     console.error("POST /api/projects error:", err);
//     return NextResponse.json(
//       { 
//         status: "error", 
//         message: "Internal server error",
//         details: process.env.NODE_ENV === 'development' ? err.message : undefined
//       },
//       { status: 500 }
//     );
//   }
// }
// export async function GET() {
//   try {
//     const projects = await getAllProjects();
    
//     return NextResponse.json(
//       { 
//         status: "success", 
//         data: projects // More consistent naming
//       },
//       { status: 200 }
//     );
    
//   } catch (err) {
//     console.error("GET /api/projects error:", err);
//     return NextResponse.json(
//       { 
//         status: "error", 
//         message: err.message || "Failed to fetch projects"
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { addProject, getAllProjects } from "../../../lib/firestore";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate required fields
    if (!body.p_name || !body.p_price || !body.p_category || !body.p_info) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    const { pid, data } = body;
    await addProject(pid, data);

    return NextResponse.json(
      { status: "success", pid, data: projectData },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { 
        status: "error", 
        message: "Internal server error",
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      },
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
        data: projects, // More consistent naming
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: err.message || "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}
