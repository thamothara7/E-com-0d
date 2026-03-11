import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { notFound } from "next/navigation"
import { ProductForm } from "../../new/product-form"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  
  // @ts-expect-error
  if (session?.user?.role !== "ADMIN") {
    notFound()
  }

  const { id } = await params
  const productId = parseInt(id)
  if (isNaN(productId)) notFound()

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: productId } }),
    prisma.category.findMany({ orderBy: { name: 'asc' } })
  ])

  if (!product) notFound()

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Product</h1>
        <p className="text-muted-foreground mt-1">Update details for {product.name}.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">
        <ProductForm categories={categories} initialData={product} />
      </div>
    </div>
  )
}
