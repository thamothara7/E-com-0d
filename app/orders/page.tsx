import { Metadata } from "next"
import { auth } from "@/auth"
import { Navbar } from "@/components/navbar"
import { redirect } from "next/navigation"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ArrowUpRight, Clock, CheckCircle2 } from "lucide-react"

import { StoreProvider } from "@/lib/store"

export const metadata: Metadata = {
  title: "My Orders | Masala Co",
  description: "View your order history.",
}

export default async function OrdersPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
  }

  // Dummy orders since there's no actual data yet
  const dummyOrders = [
    { id: "ORD-98234-A", date: "Oct 24, 2026", amount: 1450, status: "Delivered", items: 3 },
    { id: "ORD-11932-B", date: "Sep 12, 2026", amount: 2100, status: "Processing", items: 5 },
  ]

  return (
    <StoreProvider>
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 font-sans">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">My Orders</h1>
            <p className="text-gray-500 dark:text-gray-400">Track and manage your recent spice purchases.</p>
          </div>
          <Button asChild variant="outline" className="rounded-xl border-gray-200 dark:border-gray-800">
            <Link href="/">Shop Again</Link>
          </Button>
        </div>

        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 rounded-3xl overflow-hidden p-2">
          {dummyOrders.map((order, i) => (
            <div key={order.id} className={`p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between ${i !== 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}>
              <div className="flex gap-4">
                <div className="hidden sm:flex w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/30 items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-900 dark:text-gray-100">{order.id}</span>
                    {order.status === "Delivered" ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400">
                        <CheckCircle2 className="w-3 h-3" /> Delivered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400">
                        <Clock className="w-3 h-3" /> Processing
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 divide-x divide-gray-200 dark:divide-gray-800">
                    <span className="pr-3">{order.date}</span>
                    <span className="px-3">{order.items} items</span>
                    <span className="pl-3 font-medium text-gray-700 dark:text-gray-300">₹{order.amount}</span>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" className="shrink-0 group hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
                View Details
                <ArrowUpRight className="ml-2 w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </Button>
            </div>
          ))}
        </Card>
      </main>
    </div>
    </StoreProvider>
  )
}
