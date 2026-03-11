import { StoreProvider } from "@/lib/store";
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

export default function HomePage() {
  return (
    <StoreProvider>
      <Navbar />
      <main className="pb-16 md:pb-0">
        <Hero />
        <Categories />
        <FeaturedProducts />
        <BestSellers />
        <PromoCombos />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <CartSidebar />
      <MobileNav />
    </StoreProvider>
  );
}
