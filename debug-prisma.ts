import { prisma } from "./lib/prisma"

async function debug() {
  console.log("Prisma keys:", Object.keys(prisma))
  try {
    const productCount = await prisma.product.count()
    console.log("Product count:", productCount)
  } catch (e: any) {
    console.error("Error accessing product:", e.message)
  }
}

debug().then(() => process.exit(0))
