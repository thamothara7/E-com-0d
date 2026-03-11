import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Categories } from "@/components/categories";
import { FeaturedProducts } from "@/components/featured-products";
import { BestSellers } from "@/components/best-sellers";
import { PromoCombos } from "@/components/promo-combos";
import { Testimonials } from "@/components/testimonials";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { CartSidebar } from "@/components/cart-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const [featuredProducts, bestSellers, combos] = await Promise.all([
    prisma.product.findMany({ take: 8, orderBy: { createdAt: "desc" } }),
    prisma.product.findMany({ where: { rating: { gte: 4.7 } }, take: 4 }),
    prisma.product.findMany({ where: { category: "Combo Packs" } }),
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Categories />
        <FeaturedProducts initialProducts={featuredProducts as any} />
        <BestSellers products={bestSellers as any} />
        <PromoCombos initialCombos={combos as any} />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <CartSidebar />
      <MobileNav />
    </>
  );
}
