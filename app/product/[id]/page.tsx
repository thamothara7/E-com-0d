import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { ProductDetail } from "@/components/product-detail";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartSidebar } from "@/components/cart-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { StoreProvider } from "@/lib/store";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <StoreProvider>
      <Navbar />
      <main>
        <ProductDetail product={product} relatedProducts={related} />
      </main>
      <Footer />
      <CartSidebar />
      <MobileNav />
    </StoreProvider>
  );
}
