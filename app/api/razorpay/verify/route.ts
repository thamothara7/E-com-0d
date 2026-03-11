import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, db_order_id, isSandbox } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !db_order_id) {
      return NextResponse.json({ success: false, error: "Missing required parameters" }, { status: 400 })
    }

    // --- MOCK SANDBOX BYPASS ---
    // If the frontend flags it as a sandbox transaction, we verify that the server is
    // actually in a sandbox-capable state before allowing it to bypass crypto signatures.
    const isServerSandboxReady = !process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET === "sandbox"
    
    if (isSandbox) {
      if (!isServerSandboxReady) {
         return NextResponse.json({ success: false, error: "Sandbox transactions are disabled in this environment." }, { status: 403 })
      }
      
      // We skip cryptography entirely for sandbox because the backend allows it.
      // E.g., jumping straight to database updates.
    } else {
      // --- NORMAL RAZORPAY CRYPTOGRAPHY FLOW ---
      const text = razorpay_order_id + "|" + razorpay_payment_id

      const secret = process.env.RAZORPAY_KEY_SECRET
      if (!secret) {
        console.error("RAZORPAY_KEY_SECRET is not configured.")
        return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 })
      }

      const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(text.toString())
        .digest("hex")

      if (generated_signature !== razorpay_signature) {
        // Payment Failed Verification
        await prisma.order.update({
          where: { id: db_order_id },
          data: { status: "FAILED" }
        })

        return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 })
      }
    }

    // --- SHARED ATOMIC DATABASE UPDATES (Real & Sandbox) ---
    // Ensure the order belongs to the user
    const order = await prisma.order.findUnique({ where: { id: db_order_id } })
    if (order?.userId !== session.user.id) {
        return NextResponse.json({ success: false, error: "Order does not belong to user" }, { status: 403 })
    }

    // Signature matches! Update database records in a transaction
    await prisma.$transaction(async (tx: any) => {
      // 1. Update the Order status
      const updatedOrder = await tx.order.update({
        where: { id: db_order_id },
        data: { 
          status: "PAID",
          receipt: razorpay_payment_id
        }
      })

      // 2. Create the Payment Record
      await tx.payment.create({
        data: {
          orderId: updatedOrder.id,
          razorpayPaymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          razorpaySignature: razorpay_signature,
          amount: updatedOrder.amount, // Record the exact amount paid
          status: "SUCCESS"
        }
      })
    })

    return NextResponse.json({ success: true, message: "Payment verified successfully" })

  } catch (error: any) {
    console.error("Payment verification error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
