import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { StoreProvider } from "@/lib/store"
import { CartSidebar } from "@/components/cart-sidebar"
import { AddressForm } from "@/components/address-form"
import { MapPin, ChevronLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Manage Address | Masala Co",
  description: "Add or update your shipping address.",
}

export default async function AddressPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const existing = await prisma.shippingAddress.findUnique({
    where: { userId: session.user.id! },
  })

  return (
    <StoreProvider>
      <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-orange-500 transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Profile
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {existing ? "Edit Shipping Address" : "Add Shipping Address"}
              </h1>
            </div>
            <p className="text-sm text-zinc-500 ml-[52px]">
              This address will be pre-filled at checkout.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-sm p-6 md:p-8">
            <AddressForm existing={existing} />
          </div>
        </main>
        <CartSidebar />
      </div>
    </StoreProvider>
  )
}
