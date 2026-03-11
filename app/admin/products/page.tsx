import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Plus, Edit, Package } from "lucide-react"
import { DeleteProductButton } from "./delete-button"
import { ToggleVisibilityButton } from "./toggle-visibility-button"

export default async function AdminProductsPage() {
  const session = await auth()
  
  // @ts-expect-error - role is not default in next-auth type
  if (session?.user?.role !== "ADMIN") {
    notFound()
  }

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { categoryRef: true }
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } })
  ])

  const totalStock = products.reduce((acc: number, p: { stockQuantity: number }) => acc + p.stockQuantity, 0)
  const hiddenCount = products.filter((p: { isHidden: boolean }) => p.isHidden).length
  const lowStockCount = products.filter((p: { stockQuantity: number }) => p.stockQuantity <= 10).length

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Products & Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage your catalog, stock levels, and visibility.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Products</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{products.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Stock</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totalStock.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Hidden</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{hiddenCount}</p>
        </div>
        <div className={`rounded-xl border p-4 ${lowStockCount > 0 ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-800'}`}>
          <p className={`text-xs font-medium uppercase tracking-wider ${lowStockCount > 0 ? 'text-red-500' : 'text-gray-500'}`}>Low Stock</p>
          <p className={`text-2xl font-bold mt-1 ${lowStockCount > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>{lowStockCount}</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Product</th>
                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Category</th>
                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Price</th>
                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Stock</th>
                <th scope="col" className="px-6 py-4 font-medium tracking-wider">Visibility</th>
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
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-gray-100">₹{product.price.toLocaleString()}</div>
                    {product.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${
                        product.stockQuantity > 50 ? 'bg-green-500' : 
                        product.stockQuantity > 10 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className={`font-medium ${product.stockQuantity <= 10 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
                        {product.stockQuantity}
                      </span>
                      {product.stockQuantity <= 10 && (
                        <span className="text-xs text-red-500 font-medium">Low</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <ToggleVisibilityButton id={product.id} isHidden={product.isHidden} />
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
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No products found.</p>
              <p className="text-sm text-gray-400 mt-1">Add your first product to get started.</p>
              <Link href="/admin/products/new" className="inline-flex items-center gap-2 mt-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium">
                <Plus className="w-4 h-4" /> Add Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

