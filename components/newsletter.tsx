"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-14 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative bg-primary rounded-3xl overflow-hidden px-6 sm:px-12 py-12 sm:py-16 text-center">
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/5 rounded-full" />

          {/* Icon */}
          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Mail className="w-7 h-7 text-primary-foreground" />
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-primary-foreground mb-3 text-balance">
            Stay Ahead of the Spice Game
          </h2>
          <p className="text-primary-foreground/80 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
            Subscribe for exclusive recipes, first access to new blends, and members-only discounts delivered to your inbox.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-primary-foreground bg-white/15 w-fit mx-auto px-6 py-3 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">You&apos;re on the list! Check your inbox.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-white/15 text-primary-foreground placeholder:text-primary-foreground/60 border border-white/20 rounded-full px-5 py-3 text-sm outline-none focus:border-white/60 transition-colors"
              />
              <button
                type="submit"
                className="bg-card text-foreground font-semibold text-sm px-6 py-3 rounded-full hover:bg-secondary transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>
          )}

          <p className="text-primary-foreground/60 text-xs mt-4">
            No spam, unsubscribe anytime. Join 15,000+ subscribers.
          </p>
        </div>
      </div>
    </section>
  );
}
