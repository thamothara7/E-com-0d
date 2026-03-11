"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift, Percent, Zap } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data";

export function PromoCombos() {
  const { addToCart } = useStore();
  const combos = products.filter((p) => p.category === "Combo Packs");

  return (
    <section id="combos" className="py-14 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
            Limited Time Deals
          </p>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground text-balance">
            Combo Packs & Gift Sets
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm sm:text-base">
            Save more when you bundle. Perfect for gifting or stocking up your kitchen.
          </p>
        </div>

        {/* Promo Banner */}
        <div className="rounded-3xl overflow-hidden mb-10 relative bg-foreground">
          <div className="absolute inset-0">
            <Image
              src="/images/product-combo.jpg"
              alt="Combo pack promo"
              fill
              className="object-cover opacity-30"
            />
          </div>
          <div className="relative z-10 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
                This Week Only
              </p>
              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-white mb-3 text-balance">
                Buy 2, Get 1 Free
              </h3>
              <p className="text-white/70 text-sm sm:text-base max-w-md">
                Mix and match any three spice blends or ready mixes. No code needed — discount applied at checkout.
              </p>
            </div>
            <Link
              href="#featured"
              className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-bold hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Claim Offer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {[
            { icon: Gift, title: "Gift Ready", desc: "Premium packaging with every combo order" },
            { icon: Percent, title: "Up to 35% Off", desc: "Bundle savings on our most popular packs" },
            { icon: Zap, title: "Same Day Dispatch", desc: "Order before 2pm for same-day shipping" },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 bg-secondary rounded-2xl p-5 border border-border"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{title}</h4>
                <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Combo Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="flex gap-4 bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-secondary">
                <Image src={combo.image} alt={combo.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                <div>
                  {combo.badge && (
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {combo.badge}
                    </span>
                  )}
                  <h3 className="font-serif font-bold text-foreground text-base sm:text-lg mt-1 line-clamp-1">
                    {combo.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed line-clamp-2">
                    {combo.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="font-bold text-foreground">${combo.price.toFixed(2)}</span>
                    {combo.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through ml-2">
                        ${combo.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(combo)}
                    className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
