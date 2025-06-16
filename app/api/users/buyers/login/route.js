//api/users/buyers/login

import { NextResponse } from "next/server";
import { getBuyerByEmail,getAllBuyers } from "../../../../../lib/firestore"; // Adjust path if needed
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
// New GET handler to fetch all buyers
export async function GET() {
  try {
    const buyers = await getAllBuyers();
    
    // Return the buyers data
    return NextResponse.json(
      { 
        status: "success", 
        data: buyers 
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message || "Failed to fetch buyers" },
      { status: 500 }
    );
  }
}