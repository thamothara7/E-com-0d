import { Metadata } from "next"
import { auth } from "@/auth"
import { Navbar } from "@/components/navbar"
import { redirect } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, ShieldCheck, MapPin } from "lucide-react"

import { StoreProvider } from "@/lib/store"

export const metadata: Metadata = {
  title: "Profile | Masala Co",
  description: "Manage your personal information.",
}

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
  }

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
          <Card className="md:col-span-1 border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 rounded-3xl overflow-hidden self-start">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-indigo-50 dark:ring-indigo-950/50">
                {session.user.image ? (
                  <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-4xl font-bold">
                    {session.user.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{session.user.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{session.user.email}</p>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Verified Account
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
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
                    <p className="font-medium text-gray-900 dark:text-gray-100">{session.user.email}</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-100 dark:border-gray-800/50">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <MapPin className="w-3.5 h-3.5" /> Shipping Address
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic">No saved address found. Add one during checkout.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
    </StoreProvider>
  )
}
