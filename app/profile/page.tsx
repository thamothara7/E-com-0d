import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { StoreProvider } from "@/lib/store"
import { CartSidebar } from "@/components/cart-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, ShieldCheck, MapPin, Pencil, Package, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Profile | Masala Co",
  description: "Manage your personal information.",
}

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
    return null
  }

  const [savedAddress, orderCount] = await Promise.all([
    prisma.shippingAddress.findUnique({ where: { userId: session.user.id! } }),
    prisma.order.count({ where: { userId: session.user.id! } }),
  ])

  return (
    <StoreProvider>
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 font-sans">
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">My Profile</h1>
            <p className="text-gray-500 dark:text-gray-400">View and manage your personal details.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Avatar Card */}
            <Card className="md:col-span-1 border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 rounded-3xl overflow-hidden self-start">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-orange-100 dark:ring-orange-900/30">
                  {session.user.image ? (
                    <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400 text-4xl font-bold">
                      {session.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{session.user.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 truncate max-w-full">{session.user.email}</p>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-xs font-semibold mb-5">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Account
                </div>

                {/* Quick Links */}
                <div className="w-full space-y-2">
                  <Link
                    href="/orders"
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/70 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                      My Orders
                    </span>
                    <span className="text-xs font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                      {orderCount}
                    </span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/70 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group"
                  >
                    <Settings className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
                    Account Settings
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Info + Address */}
            <div className="md:col-span-2 space-y-6">
              {/* Personal Info */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 rounded-3xl overflow-hidden">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800/50 pb-4">
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> Full Name
                      </span>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{session.user.name}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" /> Email Address
                      </span>
                      <p className="font-medium text-gray-900 dark:text-gray-100 break-all">{session.user.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 rounded-3xl overflow-hidden">
                <CardHeader className="border-b border-gray-100 dark:border-gray-800/50 pb-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    Shipping Address
                  </CardTitle>
                  <Link
                    href="/profile/address"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    {savedAddress ? "Edit" : "Add Address"}
                  </Link>
                </CardHeader>
                <CardContent className="p-6">
                  {savedAddress ? (
                    <div className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{savedAddress.name}</p>
                      <p>{savedAddress.phone}</p>
                      <p>{savedAddress.street}</p>
                      <p>{savedAddress.city}, {savedAddress.state} — {savedAddress.postalCode}</p>
                      <p className="text-gray-500">{savedAddress.country}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <MapPin className="w-8 h-8 mb-3 text-gray-300 dark:text-gray-600" />
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No saved address yet</p>
                      <p className="text-xs text-gray-400 mt-1 mb-4">Add your address so we can ship orders faster!</p>
                      <Link
                        href="/profile/address"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
                      >
                        <MapPin className="w-4 h-4" />
                        Add Shipping Address
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <CartSidebar />
      <MobileNav />
    </StoreProvider>
  )
}
