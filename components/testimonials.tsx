"use client";

import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="py-14 sm:py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
            What Our Customers Say
          </p>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground text-balance">
            Loved by Home Chefs
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              4.9 average · 2,800+ reviews
            </span>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-card rounded-2xl p-5 sm:p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4"
            >
              {/* Quote Icon */}
              <Quote className="w-6 h-6 text-primary/30" />

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < t.rating
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-9 h-9 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
