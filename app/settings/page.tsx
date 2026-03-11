"use client"

import { useSession } from "next-auth/react"
import { Navbar } from "@/components/navbar"
import { redirect } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, Shield, Smartphone, Mail } from "lucide-react"
import { StoreProvider } from "@/lib/store"

export default function SettingsPage() {
  const { data: session, status } = useSession()

  if (status === "unauthenticated") {
    redirect("/")
  }

  return (
    <StoreProvider>
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 font-sans">
        <Navbar />
        
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and notifications.</p>
        </div>

        <div className="space-y-6">
          {/* Notifications Card */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-gray-100 dark:border-gray-800/50 pb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-500" />
                <CardTitle className="text-lg">Notifications</CardTitle>
              </div>
              <CardDescription>Choose what updates you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Order Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about your order status.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Promotions & Offers</Label>
                  <p className="text-sm text-muted-foreground">Get notified about new spice blends and sales.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Security & Login Card */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-gray-100 dark:border-gray-800/50 pb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-500" />
                <CardTitle className="text-lg">Security & Login</CardTitle>
              </div>
              <CardDescription>Manage how you sign in to Masala Co.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-sm">
                     <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                        <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                        <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                      </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Google Account</h4>
                    <p className="text-xs text-muted-foreground">Connected as {session?.user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 rounded-md">Active</span>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="destructive" className="rounded-xl">Delete Account</Button>
                <p className="text-xs text-muted-foreground mt-2">Permanently remove your account and all associated data.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    </StoreProvider>
  )
}
