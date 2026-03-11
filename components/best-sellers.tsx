"use client";

import { products } from "@/lib/data";
import { ProductCard } from "./product-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function BestSellers() {
  const bestSellers = products.filter((p) => p.rating >= 4.7).slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
              Community Favorites
            </p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground text-balance">
              Best Sellers
            </h2>
          </div>
          <Link
            href="#featured"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-hide">
          {bestSellers.map((product) => (
            <div key={product.id} className="min-w-[200px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="#featured"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            View all best sellers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
