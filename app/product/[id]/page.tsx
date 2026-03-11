import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartSidebar } from "@/components/cart-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { StoreProvider } from "@/lib/store";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const allProducts = await prisma.product.findMany({ select: { id: true } });
  return allProducts.map((p: any) => ({ id: String(p.id) }));
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const productId = parseInt(id);
  
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    notFound();
  }

  const related = await prisma.product.findMany({
    where: { 
      category: product.category,
      id: { not: product.id }
    },
    take: 4
  });

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
