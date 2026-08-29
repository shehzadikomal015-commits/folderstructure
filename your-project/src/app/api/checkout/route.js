import { NextResponse } from "next/server";
import { placeOrder } from "@/app/actions";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const result = await placeOrder(formData);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
