"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Lock, Key } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function AdminLoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [adminKey, setAdminKey] = useState("")

  const handleAdminParams = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Stub for future admin login
    setTimeout(() => {
      setIsLoading(false)
      alert("Admin access denied: Invalid security key.")
    }, 1000)
  }

  return (
    <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 rounded-3xl overflow-hidden w-full max-w-md mx-auto">
      <CardHeader className="pt-8">
        <CardTitle className="text-2xl text-center">Admin Portal</CardTitle>
        <CardDescription className="text-center">
          Restricted access. Enter your administrative credentials to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8">
        <form onSubmit={handleAdminParams} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="admin-email" className="text-gray-600 dark:text-gray-400">Administrator Email</Label>
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <Input 
                id="admin-email" 
                type="email" 
                placeholder="admin@masalaco.com" 
                className="pl-10 h-12 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-100" 
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="security-key" className="text-gray-600 dark:text-gray-400">Security Key</Label>
              <a href="#" className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Lost key?</a>
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                id="security-key" 
                type="password" 
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="••••••••••••" 
                className="pl-10 h-12 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-100" 
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gray-900 hover:bg-black dark:bg-gray-100 dark:hover:bg-white dark:text-gray-900 text-white shadow-xl shadow-gray-900/20 dark:shadow-white/10 transition-all group mt-4"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Access Dashboard
              </span>
            )}
          </Button>
        </form>
        
        <div className="mt-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex gap-3 text-sm text-amber-800 dark:text-amber-300">
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>This area is strictly for authorized personnel. Unauthorized access attempts are logged.</p>
        </div>
      </CardContent>
    </Card>
  )
}
