"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, ChefHat } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { SignInButton } from "@/components/sign-in-button";

export function Navbar() {
  const { cartCount, setCartOpen } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#categories", label: "Shop" },
    { href: "#featured", label: "Products" },
    { href: "#combos", label: "Combos" },
    { href: "#about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-lg text-foreground tracking-tight">
              Masala <span className="text-primary">&amp; Co.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div
            className={cn(
              "hidden md:flex items-center bg-secondary rounded-full border border-border px-3 py-1.5 gap-2 transition-all duration-300",
              searchOpen ? "w-64" : "w-48"
            )}
          >
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search spices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
              className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Mobile Search */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-foreground" />
            </button>

            {/* Account - Google Auth */}
            <div className="flex items-center">
              <SignInButton />
            </div>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex items-center bg-secondary rounded-full border border-border px-3 py-2 gap-2 mb-4">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search spices..."
                className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
