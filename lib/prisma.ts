import { PrismaClient } from "./generated/client"

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

// Validation to ensure we have the correct models
const isStale = (client: any) => client && !client.product

if (isStale(globalForPrisma.prisma)) {
  console.log("Stale PrismaClient detected in globalThis, re-initializing...")
  globalForPrisma.prisma = undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
