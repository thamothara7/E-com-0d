"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Product, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useStore();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className={cn(
        "group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            hovered ? "scale-110" : "scale-100"
          )}
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full z-10">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full z-10">
            -{discount}%
          </span>
        )}

        {/* Hover Actions */}
        <div
          className={cn(
            "absolute inset-0 bg-black/20 flex items-center justify-center gap-3 transition-opacity duration-200",
            hovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Link
            href={`/product/${product.id}`}
            className="w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={handleAddToCart}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200",
              added
                ? "bg-green-500 text-white"
                : "bg-card hover:bg-primary hover:text-primary-foreground"
            )}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground font-medium mb-1">{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground text-sm sm:text-base leading-snug hover:text-primary transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating)
                    ? "fill-accent text-accent"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground text-base">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className={cn(
              "flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full transition-all duration-200",
              added
                ? "bg-green-500 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {added ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
