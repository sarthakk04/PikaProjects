import { NextResponse } from "next/server";
import { getBuyerByEmail } from "@/lib/firestore"; // Adjust path if needed
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { b_email, b_password } = body;

    // 1. Check if buyer exists
    const buyer = await getBuyerByEmail(b_email);

    if (!buyer) {
      return NextResponse.json(
        { status: "error", message: "Email not found" },
        { status: 400 }
      );
    }

    // 2. Compare hashed password
    const isPasswordCorrect = await bcrypt.compare(
      b_password,
      buyer.b_password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { status: "error", message: "Incorrect password" },
        { status: 401 }
      );
    }

    // 3. Return success with basic buyer data
    return NextResponse.json(
      {
        status: "success",
        bid: buyer.bid,
        name: buyer.b_name,
        email: buyer.b_email,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
