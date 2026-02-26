// app/api/create-order/route.js
// ─────────────────────────────────────────────────────────
// Creates a Razorpay order server-side.
// The KEY_SECRET never leaves this file.
// ─────────────────────────────────────────────────────────

import Razorpay from "razorpay";
import crypto from "crypto";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount = 19900, currency = "INR", notes = {} } = body;

    // Validate amount (security: never trust client-sent amount in production)
    // Always hardcode the price server-side
    const FIXED_PRICE = 19900; // ₹199 in paise — change this for other products

    const order = await razorpay.orders.create({
      amount:          FIXED_PRICE,
      currency:        currency,
      receipt:         `rcpt_${crypto.randomBytes(8).toString("hex")}`,
      payment_capture: 1, // Auto-capture payment
      notes: {
        product:  "ResumePro Download",
        template: notes.template || "modern",
        user:     notes.user     || "anonymous",
        ...notes,
      },
    });

    return NextResponse.json({
      success:   true,
      order_id:  order.id,
      amount:    order.amount,
      currency:  order.currency,
    });

  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
