import { NextResponse } from "next/server";
import { updateSeller, deleteSeller, getSeller } from "@/lib/firestore";

// GET /api/users/Sellers/:sid
export async function GET(req, context) {
  const { sid } = context.params;
  try {
    const Seller = await getSeller(sid);
    if (!Seller) {
      return NextResponse.json(
        { status: "error", message: "Not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ status: "success", Seller });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}

// PUT /api/users/Sellers/:sid
export async function PUT(req, context) {
  const { sid } = context.params;
  const data = await req.json();
  try {
    await updateSeller(sid, data);
    return NextResponse.json({ status: "success", message: "Seller updated" });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}

// DELETE /api/users/Sellers/:sid
export async function DELETE(_, context) {
  const { sid } = context.params;
  try {
    await deleteSeller(sid);
    return NextResponse.json({ status: "success", message: "Seller deleted" });
  } catch (err) {
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}