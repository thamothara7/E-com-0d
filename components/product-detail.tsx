"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Zap,
  ChevronLeft,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Package,
} from "lucide-react";
import { Product, useStore } from "@/lib/store";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "ingredients" | "reviews">(
    "description"
  );
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" />
            Back
          </Link>
          <span>/</span>
          <Link href="/#featured" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full z-10">
                  {product.badge}
                </span>
              )}
              {discount && (
                <span className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full z-10">
                  -{discount}%
                </span>
              )}
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((img, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all",
                    i === 0 ? "border-primary" : "border-transparent hover:border-border"
                  )}
                >
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
                {product.category}
              </p>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-foreground text-balance leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="font-bold text-3xl text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {discount && (
                <span className="bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full">
                  Save {discount}%
                </span>
              )}
            </div>

            {product.weight && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="w-4 h-4 text-primary" />
                <span>Net Weight: <strong className="text-foreground">{product.weight}</strong></span>
              </div>
            )}

            <p className="text-muted-foreground text-sm leading-relaxed border-t border-border pt-5">
              {product.description}
            </p>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* Quantity Selector */}
              <div className="flex items-center gap-3 bg-secondary rounded-full border border-border px-2 py-1.5 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full hover:bg-card flex items-center justify-center transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-foreground w-6 text-center text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full hover:bg-card flex items-center justify-center transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all duration-200",
                  addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                )}
              >
                <ShoppingCart className="w-4 h-4" />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>

              {/* Buy Now */}
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold border-2 border-primary text-primary hover:bg-primary/5 transition-all duration-200">
                <Zap className="w-4 h-4" />
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
              {[
                { icon: Truck, label: "Free Shipping", sub: "Over ₹500" },
                { icon: ShieldCheck, label: "100% Natural", sub: "No additives" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5 p-3 bg-secondary rounded-xl">
                  <Icon className="w-4 h-4 text-primary" />
                  <p className="font-semibold text-foreground text-xs">{label}</p>
                  <p className="text-muted-foreground text-[10px]">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex gap-1 border-b border-border mb-6">
            {(["description", "ingredients", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-3 text-sm font-semibold capitalize transition-all duration-200 border-b-2 -mb-px",
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
            {activeTab === "description" && (
              <p>{product.description} Our blends are carefully sourced from trusted farms, slow-roasted to preserve aroma, and freshly ground for maximum potency. Each batch is quality-tested to ensure consistency and purity.</p>
            )}
            {activeTab === "ingredients" && (
              <div>
                <p className="font-semibold text-foreground mb-3">Ingredients:</p>
                <p>{product.ingredients}</p>
                <p className="mt-4 text-xs">No artificial colors, flavors, or preservatives. Suitable for vegetarians and vegans. May contain traces of nuts.</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 pb-4 border-b border-border">
                  <div className="text-center">
                    <p className="font-serif font-bold text-5xl text-foreground">{product.rating}</p>
                    <div className="flex items-center gap-0.5 justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-3 h-3", i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground")} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{product.reviewCount} reviews</p>
                  </div>
                </div>
                <p className="text-sm italic text-muted-foreground">Customer reviews are shown on individual product pages.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
