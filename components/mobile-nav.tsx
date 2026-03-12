"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Search, ShoppingCart, User, LogIn } from "lucide-react";
import { useStore } from "@/lib/store";
import { useSession, signIn } from "next-auth/react";

export function MobileNav() {
  const { cartCount, setCartOpen } = useStore();
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-16 px-4 max-w-sm mx-auto">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-primary"
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        {/* Search — navigates to /#featured regardless of current page */}
        <button
          onClick={() => router.push("/#featured")}
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Browse products"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        <button
          onClick={() => setCartOpen(true)}
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors relative"
          aria-label={`Open cart with ${cartCount} items`}
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </button>

        {status === "authenticated" && session?.user ? (
          <Link
            href="/profile"
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Profile"
          >
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-5 h-5 rounded-full object-cover border border-border"
              />
            ) : (
              <User className="w-5 h-5" />
            )}
            <span className="text-[10px] font-medium">Account</span>
          </Link>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Sign in"
          >
            <LogIn className="w-5 h-5" />
            <span className="text-[10px] font-medium">Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
}
