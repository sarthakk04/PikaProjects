

// import { verifyAdminCredentials } from "../../../../lib/firestore";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { username, password } = await req.json();
//     console.log("Received credentials:", { username });

//     if (!username || !password) {
//       return new Response(
//         JSON.stringify({ message: "Username and password are required" }),
//         { status: 400 }
//       );
//     }

//     const isValid = await verifyAdminCredentials(username, password);
//     console.log("Verification result:", isValid);

//     if (isValid) {
//       const response = NextResponse.json({ message: "Login successful" });

//       // Set HTTP-only admin token cookie
//       response.cookies.set("admin_token", "your_secret_admin_token", {
//         httpOnly: true,
//         path: "/",
//         maxAge: 60 * 60 * 24, // 1 day
//       });

//       return response;
//     } else {
//       return NextResponse.json(
//         { message: "Invalid credentials" },
//         { status: 401 }
//       );
//     }
//   } catch (error) {
//     console.error("Error in POST /api/admin/login:", error);
//     return NextResponse.json(
//       { message: "Server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "../../../../lib/firestore";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    console.log("Received credentials:", { username });

    if (!username || !password) {
      return new Response(
        JSON.stringify({ message: "Username and password are required" }),
        { status: 400 }
      );
    }

    const isValid = await verifyAdminCredentials(username, password);
    console.log("Verification result:", isValid);

    if (isValid) {
      return new Response(
        JSON.stringify({ message: "Login successful" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/admin/login:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}