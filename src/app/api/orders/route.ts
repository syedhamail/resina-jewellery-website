import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const order = await request.json(); // Parse JSON body
    // Save to database or log (e.g., Firebase, MongoDB)
    console.log("New Order:", order);
    return NextResponse.json({ message: "Order saved" }, { status: 200 });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json({ message: "Failed to save order" }, { status: 500 });
  }
}