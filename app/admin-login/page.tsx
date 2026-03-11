import { Metadata } from "next"
import { AdminLoginForm } from "@/components/admin-login-form"

export const metadata: Metadata = {
  title: "Admin Login | Masala Co",
  description: "Sign in to the admin portal.",
}

export default function AdminLoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full flex justify-between px-10 pointer-events-none">
        <div className="w-96 h-96 bg-purple-500/20 dark:bg-purple-900/30 rounded-full blur-3xl animate-pulse" />
        <div className="w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-3xl translate-y-1/2" />
        <div className="w-80 h-80 bg-rose-500/20 dark:bg-rose-900/20 rounded-full blur-3xl -translate-y-1/4 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-white/20 dark:border-gray-800 shadow-xl mb-6">
            <svg
              className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Welcome Back</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Sign in to your account to continue</p>
        </div>

        <AdminLoginForm />

        <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-2">
          <span>&copy; {new Date().getFullYear()} Masala Co. All rights reserved.</span>
        </p>
      </div>
    </div>
  )
}
