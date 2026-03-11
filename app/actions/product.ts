"use server"

import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { createSafeAction } from "@/lib/safe-action"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

const ProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().min(0, "Price must be at least 0"),
  categoryId: z.number().positive("Category is required"),
  originalPrice: z.number().optional().nullable(),
  description: z.string().optional(),
  ingredients: z.string().optional(),
  weight: z.string().optional(),
  stockQuantity: z.number().min(0, "Stock cannot be negative"),
  image: z.string().url("Valid image URL is required").or(z.string().startsWith("/")).or(z.string().startsWith("data:image/")),
  isHidden: z.boolean().default(false)
})

export const createProduct = createSafeAction(
  ProductSchema,
  async (data, userId) => {
    // strict admin check again at action level
    const session = await auth()
    // @ts-expect-error
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    const category = await prisma.category.findUnique({ where: { id: data.categoryId } })
    if (!category) throw new Error("Category not found")

    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        originalPrice: data.originalPrice,
        categoryId: data.categoryId,
        category: category.name, // keep in sync
        description: data.description,
        ingredients: data.ingredients,
        weight: data.weight,
        stockQuantity: data.stockQuantity,
        image: data.image,
        isHidden: data.isHidden
      }
    })

    revalidatePath("/admin/products")
    revalidatePath("/")
    
    return product
  }
)

export const updateProduct = createSafeAction(
  z.object({
    id: z.number(),
    ...ProductSchema.shape
  }),
  async (data, userId) => {
    const session = await auth()
    // @ts-expect-error
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    const category = await prisma.category.findUnique({ where: { id: data.categoryId } })
    if (!category) throw new Error("Category not found")

    const product = await prisma.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        price: data.price,
        originalPrice: data.originalPrice,
        categoryId: data.categoryId,
        category: category.name,
        description: data.description,
        ingredients: data.ingredients,
        weight: data.weight,
        stockQuantity: data.stockQuantity,
        image: data.image,
        isHidden: data.isHidden
      }
    })

    revalidatePath("/admin/products")
    revalidatePath("/")
    
    return product
  }
)

export const deleteProduct = createSafeAction(
  z.object({ id: z.number() }),
  async (data, userId) => {
    const session = await auth()
    // @ts-expect-error
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    await prisma.product.delete({
      where: { id: data.id }
    })

    revalidatePath("/admin/products")
    revalidatePath("/")
    
    return { success: true }
  }
)
