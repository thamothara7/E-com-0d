import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Plus, Edit, EyeOff, Eye } from "lucide-react"
import { DeleteProductButton } from "./delete-button"

export default async function AdminProductsPage() {
  const session = await auth()
  
  // @ts-expect-error - role is not default in next-auth type
  if (session?.user?.role !== "ADMIN") {
    notFound()
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categoryRef: true
    }
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Products Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage your catalog, stock levels, and pricing.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Product</th>
                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Category</th>
                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Price</th>
                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Stock</th>
                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {products.map((product: any) => (
                <tr key={product.id} className={`hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors ${product.isHidden ? 'opacity-60' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-900 overflow-hidden shrink-0 border border-gray-100 dark:border-gray-800">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                        <div className="text-xs text-gray-500 max-w-[200px] truncate">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                      {product.categoryRef?.name || product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        product.stockQuantity > 50 ? 'bg-green-500' : 
                        product.stockQuantity > 10 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="font-medium">{product.stockQuantity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {product.isHidden ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                        <EyeOff className="w-3.5 h-3.5" /> Hidden
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-500">
                        <Eye className="w-3.5 h-3.5" /> Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteProductButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {products.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              No products found. Add your first product to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
