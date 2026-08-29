import { NextResponse } from "next/server";
import { getOrderById } from "@/app/actions";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const result = await getOrderById(id);

    if (result.error || !result.order) {
      return NextResponse.json(
        { error: result.error || "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order: result.order }, { status: 200 });
  } catch (error) {
    console.error("Get order API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
