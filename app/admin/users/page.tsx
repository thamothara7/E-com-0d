import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Users, Shield, User } from "lucide-react"

export default async function AdminUsersPage() {
  const session = await auth()
  
  // Extra safety wrapper
  // @ts-expect-error - role is not default in next-auth type
  if (session?.user?.role !== "ADMIN") {
    redirect("/unauthorized")
  }

  // Fetch all users
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { orders: true }
      }
    }
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Users Management</h1>
        <p className="text-muted-foreground">View all registered users and administrators on the platform.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500">
            <Users className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">No users found</p>
            <p className="text-sm mt-1">This is quite unusual.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">User</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider text-center">Total Orders</th>
                  <th scope="col" className="px-6 py-4 font-medium tracking-wider">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {users.map((dbUser: any) => (
                  <tr key={dbUser.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {dbUser.image ? (
                          <img src={dbUser.image} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700" />
                        ) : (
                          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                            {dbUser.name?.charAt(0) || dbUser.email?.charAt(0) || "?"}
                          </div>
                        )}
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {dbUser.name || "No name provided"}
                          {dbUser.id === session.user?.id && <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 px-1.5 py-0.5 rounded font-bold uppercase">You</span>}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {dbUser.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide
                        ${dbUser.role === 'ADMIN' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50' : 
                        'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>
                        {dbUser.role === "ADMIN" ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {dbUser.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${dbUser._count.orders > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                        {dbUser._count.orders}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap text-sm">
                      {new Date(dbUser.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
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
