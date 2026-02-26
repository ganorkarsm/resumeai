// app/api/verify-payment/route.js
// ─────────────────────────────────────────────────────────
// Verifies Razorpay payment signature to confirm payment
// is genuine and hasn't been tampered with.
// Only after this passes should you unlock the download.
// ─────────────────────────────────────────────────────────

import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { verified: false, error: "Missing payment fields" },
        { status: 400 }
      );
    }

    // ── Verify HMAC signature ─────────────────────────────
    // Razorpay signs the payment with your KEY_SECRET.
    // If the signatures match, the payment is genuine.
    const body             = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "hex"),
      Buffer.from(razorpay_signature,  "hex")
    );

    if (!isValid) {
      console.warn("⚠️ Payment signature mismatch!", { razorpay_payment_id });
      return NextResponse.json(
        { verified: false, error: "Payment signature invalid — possible fraud attempt" },
        { status: 400 }
      );
    }

    // ── Payment is genuine ────────────────────────────────
    console.log("✅ Payment verified:", razorpay_payment_id);

    // TODO: Save to your database here
    // e.g., await db.payments.create({ payment_id, order_id, amount: 19900 });

    // TODO: Send confirmation email here
    // e.g., await sendEmail({ to: user.email, subject: "Your ResuméAI Download" });

    return NextResponse.json({
      verified:   true,
      payment_id: razorpay_payment_id,
      order_id:   razorpay_order_id,
      message:    "Payment verified successfully",
    });

  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { verified: false, error: error.message },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────
// WEBHOOK (for automatic payment status updates)
// Set up at: https://dashboard.razorpay.com/app/webhooks
// URL: https://yoursite.com/api/verify-payment/webhook
// ─────────────────────────────────────────────────────────
export async function handleWebhook(req) {
  const rawBody  = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const expectedSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (expectedSig !== signature) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  switch (event.event) {
    case "payment.captured":
      const payment = event.payload.payment.entity;
      console.log(`💰 Payment captured: ₹${payment.amount / 100} — ID: ${payment.id}`);
      // TODO: Update database, send email receipt
      break;

    case "payment.failed":
      const failed = event.payload.payment.entity;
      console.log(`❌ Payment failed: ${failed.id} — Reason: ${failed.error_description}`);
      break;

    default:
      console.log("Unhandled webhook event:", event.event);
  }

  return NextResponse.json({ status: "ok" });
}
