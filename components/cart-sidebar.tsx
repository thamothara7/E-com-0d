"use client";

import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CartSidebar() {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } =
    useStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-50 transition-opacity duration-300",
          cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-96 bg-card z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out",
          cartOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-serif font-bold text-foreground text-lg">
              Your Cart
              {cartCount > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({cartCount} {cartCount === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors px-3 py-1 rounded-full border border-border hover:border-destructive/20"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                <ShoppingBag className="w-9 h-9 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Your cart is empty</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Add some delicious spices to get started!
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-secondary rounded-xl p-3 border border-border"
                >
                  {/* Image */}
                  <div className="relative w-18 h-18 rounded-lg overflow-hidden shrink-0 bg-card w-[72px] h-[72px]">
                    <Image
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <p className="font-semibold text-foreground text-sm leading-snug line-clamp-2">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors shrink-0 ml-1"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 bg-card rounded-full border border-border px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold text-foreground w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-foreground text-sm">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-border bg-card">
            {/* Free shipping notice */}
            {cartTotal < 500 && (
              <div className="bg-secondary rounded-lg p-3 mb-4 text-xs text-center text-muted-foreground">
                Add{" "}
                <span className="font-semibold text-foreground">
                  ₹{(500 - cartTotal).toLocaleString()}
                </span>{" "}
                more for free shipping!
              </div>
            )}
            {cartTotal >= 500 && (
              <div className="bg-primary/10 rounded-lg p-3 mb-4 text-xs text-center text-primary font-medium">
                You qualify for free shipping!
              </div>
            )}

            {/* Order Summary */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span className={cartTotal >= 500 ? "text-primary font-medium" : ""}>
                  {cartTotal >= 500 ? "Free" : "₹50"}
                </span>
              </div>
              <div className="flex justify-between font-bold text-foreground text-base pt-2 border-t border-border">
                <span>Total</span>
                <span>₹{(cartTotal + (cartTotal >= 500 ? 0 : 50)).toLocaleString()}</span>
              </div>
            </div>

            <Link 
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
            >
              Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setCartOpen(false)}
              className="w-full text-muted-foreground text-sm font-medium py-2 mt-2 hover:text-foreground transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
