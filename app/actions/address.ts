"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function saveAddress(formData: FormData) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized: You must be signed in to save an address.")
  }

  const data = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    street: formData.get("street") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    postalCode: formData.get("postalCode") as string,
    country: (formData.get("country") as string) || "India",
  }

  // Validate required fields
  for (const [key, value] of Object.entries(data)) {
    if (!value || value.trim() === "") {
      throw new Error(`Field "${key}" is required.`)
    }
  }

  await prisma.shippingAddress.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, ...data },
    update: { ...data },
  })

  revalidatePath("/profile")
  revalidatePath("/profile/address")
}
