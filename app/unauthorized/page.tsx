import Link from "next/link";
import { ShieldX, Home, User } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-orange-50/50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-300/20 dark:bg-red-900/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-300/20 dark:bg-amber-900/20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="space-y-4">
          {/* Icon */}
          <div className="flex justify-center mb-2">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shadow-lg">
              <ShieldX className="w-10 h-10 text-red-500 dark:text-red-400" />
            </div>
          </div>

          <div className="relative flex justify-center items-center py-4">
            {/* Ghost 403 */}
            <h1 className="text-8xl md:text-[12rem] font-serif font-bold text-orange-900/10 dark:text-orange-100/10 tracking-tighter absolute select-none">
              403
            </h1>

            {/* Main 403 */}
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-orange-900 dark:text-orange-100 tracking-tighter drop-shadow-sm relative z-10">
              403
            </h1>
          </div>

          <div className="h-1.5 w-24 bg-gradient-to-r from-red-400 to-orange-500 mx-auto rounded-full" />

          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-zinc-800 dark:text-zinc-200 pt-4">
            Access Denied
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            You don&apos;t have permission to enter this kitchen. This area is
            reserved for our team only.
          </p>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25"
          >
            <Home className="w-5 h-5" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/profile"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 hover:bg-white dark:bg-zinc-900/80 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm"
          >
            <User className="w-5 h-5" />
            <span>My Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
