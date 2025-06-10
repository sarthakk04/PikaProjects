import { NextResponse } from "next/server";
import { updateBuyer, deleteBuyer, getBuyer } from "@/lib/firestore";

// GET /api/users/buyers/:bid
export async function GET(req, context) {
  const { bid } = context.params;
  try {
    const buyer = await getBuyer(bid);
    if (!buyer) {
      return NextResponse.json(
        { status: "error", message: "Not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ status: "success", buyer });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}

// PUT /api/users/buyers/:bid
export async function PUT(req, context) {
  const { bid } = context.params;
  const data = await req.json();
  try {
    await updateBuyer(bid, data);
    return NextResponse.json({ status: "success", message: "Buyer updated" });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}

// DELETE /api/users/buyers/:bid
export async function DELETE(_, context) {
  const { bid } = context.params;
  try {
    await deleteBuyer(bid);
    return NextResponse.json({ status: "success", message: "Buyer deleted" });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
