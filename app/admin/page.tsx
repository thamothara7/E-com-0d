import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboardPage() {
  const session = await auth()
  
  // Fetch Real Users & Orders data
  const userCount = await prisma.user.count()
  const orderCount = await prisma.order.count()
  
  // Fetch real revenue
  const totalRevenueData = await prisma.order.aggregate({
    where: { status: "PAID" },
    _sum: { amount: true }
  })
  
  const totalRevenue = (totalRevenueData._sum.amount || 0) / 100 // assuming amount is stored in paise

  // Fetch recent transactions
  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true }
      }
    }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Welcome, {session?.user?.name || 'Admin'}</h1>
      <p className="text-muted-foreground mb-8">Here is an overview of your Masala Co platform.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Stat Card 1 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500 mb-1">Total Users</span>
          <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{userCount}</span>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500 mb-1">Total Orders</span>
          <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{orderCount}</span>
        </div>
        
        {/* Stat Card 3 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500 mb-1">Total Revenue</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">₹{totalRevenue.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Recent Transactions</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              No transactions yet. (Phase 2 waiting on Checkout)
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-medium tracking-wider">Order ID</th>
                    <th scope="col" className="px-6 py-4 font-medium tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-4 font-medium tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-4 font-medium tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-4 font-medium tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {recentOrders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{order.id.slice(0, 8)}...</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{order.user.name || "Unknown"}</div>
                        <div className="text-xs text-gray-500">{order.user.email}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">₹{(order.amount / 100).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${order.status === 'PAID' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                          order.status === 'FAILED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                          {order.status.toLowerCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
