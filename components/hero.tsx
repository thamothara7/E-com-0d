"use client";

import { ArrowRight, Star, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[520px] py-12 lg:py-16">
          {/* Text Content */}
          <div className="flex flex-col gap-6 z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold w-fit">
              <Star className="w-3.5 h-3.5 fill-primary" />
              <span>Trusted by 50,000+ home chefs</span>
            </div>

            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight text-balance">
              Cook with <span className="text-primary">Passion</span>,
              <br />
              Spice with <span className="text-primary">Purpose</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg">
              Handcrafted spice blends and cooking mixes made from the finest
              ingredients. Transform every meal into an unforgettable experience.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#featured"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 bg-card text-foreground px-6 py-3 rounded-full text-sm font-semibold border border-border hover:border-primary hover:text-primary transition-all duration-200"
              >
                Explore Categories
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="w-4 h-4 text-primary" />
                <span>Free delivery over $40</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Natural ingredients</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span>4.9 / 5 customer rating</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-72 sm:h-96 lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero-bg.jpg"
              alt="Premium spices and cooking ingredients beautifully arranged"
              fill
              className="object-cover"
              priority
            />
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border">
              <p className="text-xs text-muted-foreground font-medium">This week</p>
              <p className="font-serif font-bold text-foreground text-lg">Biryani Magic</p>
              <div className="flex items-center gap-1 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                ))}
                <span className="text-xs text-muted-foreground ml-1">512 reviews</span>
              </div>
            </div>
            {/* Promo badge */}
            <div className="absolute top-6 right-6 bg-primary text-primary-foreground rounded-2xl px-4 py-2 text-center shadow-lg">
              <p className="text-xs font-medium opacity-90">Up to</p>
              <p className="font-bold text-xl leading-none">30%</p>
              <p className="text-xs font-medium opacity-90">OFF</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
