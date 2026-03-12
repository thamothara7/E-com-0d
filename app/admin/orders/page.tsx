import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { PackageX } from "lucide-react"

export default async function AdminOrdersPage() {
  const session = await auth()
  
  // Extra safety wrapper (middleware and layout also protect this)
  // @ts-expect-error - role is not default in next-auth type
  if (session?.user?.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  // Fetch orders with user and items details
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true }
      },
      items: {
        include: {
          product: {
            select: { name: true }
          }
        }
      }
    }
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Orders Management</h1>
        <p className="text-muted-foreground">View and track all customer orders across the platform.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
            <PackageX className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">No orders found</p>
            <p className="text-sm mt-1">When customers place orders, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Items</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Total Amount</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                        {order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{order.user.name || "Unknown Customer"}</div>
                      <div className="text-xs text-gray-500">{order.user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900 dark:text-gray-100 group-hover:block hidden absolute bg-white dark:bg-gray-800 border dark:border-gray-700 p-3 rounded-lg shadow-lg z-10 w-64 mt-1 -ml-4 pointer-events-none">
                        <p className="font-semibold text-xs mb-2 border-b dark:border-gray-700 pb-1">Order Details</p>
                        <ul className="space-y-1">
                          {order.items.map((item: any, idx: number) => (
                            <li key={idx} className="text-xs flex justify-between">
                              <span className="truncate pr-2">{item.product.name}</span>
                              <span className="text-gray-500 shrink-0">x{item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 font-medium cursor-help underline decoration-dotted underline-offset-2">
                        {order.items.reduce((acc: number, item: any) => acc + item.quantity, 0)} items
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">
                      ₹{(order.amount / 100).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide
                        ${order.status === 'PAID' || order.status === 'SUCCESS' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                        order.status === 'FAILED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap text-sm">
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
