"use server"

import { z } from "zod"
import { createSafeAction } from "@/lib/safe-action"
import { razorpay } from "@/lib/razorpay"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.number(),
    quantity: z.number().min(1)
  })).min(1),
})

export const createRazorpayOrder = createSafeAction(
  createOrderSchema,
  async ({ items }, userId) => {
    // 1. Fetch Real Products from DB to prevent tampering
    const productIds = items.map(i => i.productId)
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } }
    })

    if (dbProducts.length !== productIds.length) {
      throw new Error("One or more products not found")
    }

    // 2. Calculate Real Totals on Server
    let subtotalPaise = 0
    const orderItemsData = items.map(item => {
      const product = dbProducts.find((p: any) => p.id === item.productId)!
      const itemSubtotal = product.price * item.quantity
      subtotalPaise += Math.round(itemSubtotal * 100)
      
      return {
        productId: item.productId,
        quantity: item.quantity,
        priceAtTime: product.price
      }
    })

    // 3. Shipping Calculation (Indian Rupee Logic)
    // Free Shipping above ₹500 (50000 paise), otherwise ₹50 (5000 paise)
    const shippingThresholdPaise = 50000 
    const shippingPaise = subtotalPaise >= shippingThresholdPaise ? 0 : 5000
    const totalPaise = subtotalPaise + shippingPaise

    // 4. Atomic Transaction: Create Order + OrderItems
    const dbOrder = await prisma.order.create({
      data: {
        userId,
        amount: totalPaise,
        status: "PENDING",
        items: {
          create: orderItemsData
        }
      }
    })

    const isSandbox = !process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET === "sandbox"

    if (isSandbox) {
      return {
        orderId: `order_sandbox_${crypto.randomUUID().replace(/-/g, '').slice(0, 14)}`,
        amount: totalPaise,
        currency: "INR",
        dbOrderId: dbOrder.id,
        isSandbox: true,
        shipping: shippingPaise / 100
      }
    }

    // 2. REAL Order in Razorpay
    const options = {
      amount: totalPaise.toString(),
      currency: "INR",
      receipt: dbOrder.id,
    }
    
    const razorpayOrder = await razorpay.orders.create(options)

    if (!razorpayOrder) {
      throw new Error("Failed to create Razorpay order")
    }

    return {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount, 
      currency: razorpayOrder.currency,
      dbOrderId: dbOrder.id,
      isSandbox: false,
      shipping: shippingPaise / 100
    }
  },
  { enforceRateLimit: true, rateLimitKey: "create-order" }
)
