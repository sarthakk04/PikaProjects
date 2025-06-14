// app/api/users/buyers/route.js
import { NextResponse } from "next/server";
import { addBuyer, getBuyerByEmail, getNextBuyerId } from "@/lib/firestore";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  const { b_name, b_email, b_password } = body;

  try {
    // 1. Check if user already exists
    const existingBuyer = await getBuyerByEmail(b_email);
    if (existingBuyer) {
      return NextResponse.json(
        { status: "error", message: "Email already exists" },
        { status: 400 }
      );
    }

    // 2. Generate new buyer ID
    const bid = await getNextBuyerId();

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(b_password, 10);

    // 4. Create buyer data
    const data = {
      b_name,
      b_email,
      b_password: hashedPassword,
      registeredAt: new Date().toISOString(),
    };

    // 5. Save buyer
    await addBuyer(bid, data);

    return NextResponse.json({ status: "success", bid }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}