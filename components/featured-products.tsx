"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { Product } from "@/lib/store";

const categories = ["All", "Spice Mixes", "Ready Mix", "Combo Packs"];

interface FeaturedProductsProps {
  initialProducts: Product[];
}

export function FeaturedProducts({ initialProducts }: FeaturedProductsProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? initialProducts
      : initialProducts.filter((p) => p.category === activeCategory);

  return (
    <section id="featured" className="py-14 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
            Our Collection
          </p>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground text-balance">
            Featured Products
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            Curated blends loved by thousands of home cooks and professional chefs.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8 sm:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
