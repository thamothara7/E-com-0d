import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { notFound } from "next/navigation"
import { ProductForm } from "./product-form"

export default async function NewProductPage() {
  const session = await auth()
  
  // @ts-expect-error
  if (session?.user?.role !== "ADMIN") {
    notFound()
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Add New Product</h1>
        <p className="text-muted-foreground mt-1">Create a new product listing for your store.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  )
}
