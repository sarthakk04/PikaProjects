import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "1234") {
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_token", "your_secret_admin_token", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
