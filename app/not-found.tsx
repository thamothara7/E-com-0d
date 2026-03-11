import Link from "next/link";
import { ChevronRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-orange-50/50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-300/20 dark:bg-orange-900/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-300/20 dark:bg-amber-900/20 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="space-y-4">
          <h1 className="text-8xl md:text-[12rem] font-serif font-bold text-orange-900/10 dark:text-orange-100/10 tracking-tighter absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -z-10 select-none">
            404
          </h1>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-orange-900 dark:text-orange-100 tracking-tighter drop-shadow-sm">
            404
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-orange-400 to-amber-600 mx-auto rounded-full" />
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-zinc-800 dark:text-zinc-200 pt-4">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            Like a rare spice blend, the page you're looking for seems to have vanished from our collection.
          </p>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25"
          >
            <Home className="w-5 h-5" />
            <span>Return to Kitchen</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 hover:bg-white dark:bg-zinc-900/80 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm"
          >
            <Search className="w-5 h-5" />
            <span>Browse Spices</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
