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
  badge: z.string().optional().nullable(),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().min(0).default(0),
  stockQuantity: z.number().min(0, "Stock cannot be negative"),
  image: z.string().optional().default(""), // transition field
  images: z.array(z.string()).min(1, "At least one image is required"),
  isHidden: z.boolean().default(false)
})

export const createProduct = createSafeAction(
  ProductSchema,
  async (data, userId) => {
    // strict admin check again at action level
    const session = await auth()
    // @ts-expect-error
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    console.log("[createProduct] Attempting to create product with data:", data)
    
    const category = await prisma.category.findUnique({ where: { id: data.categoryId } })
    if (!category) {
      console.error("[createProduct] Category not found for ID:", data.categoryId)
      throw new Error("Category not found")
    }

    try {
      const product = await prisma.product.create({
        data: {
          name: data.name,
          price: data.price,
          originalPrice: data.originalPrice,
          categoryId: data.categoryId,
          category: category.name,
          description: data.description,
          ingredients: data.ingredients,
          weight: data.weight,
          badge: data.badge,
          rating: data.rating,
          reviewCount: data.reviewCount,
          stockQuantity: data.stockQuantity,
          image: data.images[0] || "", // use first image for legacy field
          images: data.images,
          isHidden: data.isHidden
        }
      })

      console.log("[createProduct] Product created successfully:", product.id)
      revalidatePath("/admin/products")
      revalidatePath("/")
      
      return product
    } catch (error: any) {
      console.error("[createProduct] Prisma Error:", error)
      if (error.code === 'P2002') {
        console.error("[createProduct] Unique constraint failed on fields:", error.meta?.target)
      }
      throw error // Re-throw to be caught by safe-action
    }
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
        badge: data.badge,
        rating: data.rating,
        reviewCount: data.reviewCount,
        stockQuantity: data.stockQuantity,
        image: data.images[0] || "",
        images: data.images,
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

export const toggleProductVisibility = createSafeAction(
  z.object({ id: z.number() }),
  async (data) => {
    const session = await auth()
    // @ts-expect-error
    if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized")

    const product = await prisma.product.findUnique({ where: { id: data.id }, select: { isHidden: true } })
    if (!product) throw new Error("Product not found")

    const updated = await prisma.product.update({
      where: { id: data.id },
      data: { isHidden: !product.isHidden }
    })

    revalidatePath("/admin/products")
    revalidatePath("/")
    
    return updated
  }
)
