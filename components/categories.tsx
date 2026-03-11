"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function Categories() {
  return (
    <section id="categories" className="py-14 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
              Browse by Category
            </p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground text-balance">
              Find Your Perfect Blend
            </h2>
          </div>
          <Link
            href="#featured"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href="#featured"
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-[3/4]"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Count badge */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm text-foreground text-xs font-semibold px-2.5 py-1 rounded-full border border-border">
                {category.count}+ items
              </div>
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="text-white/70 text-xs sm:text-sm mb-0.5">
                  {category.description}
                </p>
                <h3 className="text-white font-serif font-bold text-base sm:text-lg leading-tight">
                  {category.name}
                </h3>
                <div className="flex items-center gap-1 mt-2 text-white/60 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-1 group-hover:translate-y-0">
                  Shop now <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="#featured"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            View all categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
