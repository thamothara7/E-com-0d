import { ReactNode } from "react"
import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  
  // Double protection (Middleware already protects /admin, but server components should also check)
  if (!session?.user) {
    redirect("/login")
  }

  // Restrict to Admins only by showing a 404
  // @ts-expect-error - role is not default in next-auth type
  if (session.user.role !== "ADMIN") {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 flex flex-col md:flex-row">
      {/* Sidebar Placeholder */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-r p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2 text-sm">
          <a href="/admin" className="block p-3 rounded-lg bg-gray-100 dark:bg-gray-700 font-medium">Dashboard</a>
          <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">Orders</a>
          <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">Users</a>
          <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">Products</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
