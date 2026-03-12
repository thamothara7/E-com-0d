import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StoreProvider } from "@/lib/store"
import { CartSidebar } from "@/components/cart-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { ProductCard } from "@/components/product-card"
import { Search } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Search | Masala & Co.",
  description: "Search for your favourite spices and blends.",
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q?.trim() ?? ""

  // --- Ranked search algorithm ---
  // We fetch three overlapping tiers and merge+deduplicate with priority:
  //   Tier 1 → exact name match (highest relevance)
  //   Tier 2 → name contains term OR badge matches
  //   Tier 3 → category, ingredients, description contains term
  let products: any[] = []

  if (query) {
    const [tier1, tier2, tier3] = await Promise.all([
      // Tier 1: name starts with query (best match)
      prisma.product.findMany({
        where: {
          isHidden: false,
          name: { startsWith: query, mode: "insensitive" },
        },
        orderBy: { rating: "desc" },
        take: 24,
      }),

      // Tier 2: name contains query anywhere
      prisma.product.findMany({
        where: {
          isHidden: false,
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { badge: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: { rating: "desc" },
        take: 24,
      }),

      // Tier 3: category, description, or ingredients contain query
      prisma.product.findMany({
        where: {
          isHidden: false,
          OR: [
            { category: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { ingredients: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: { rating: "desc" },
        take: 24,
      }),
    ])

    // Merge with priority: tier1 first, then tier2, then tier3 — deduplicate by id
    const seen = new Set<number>()
    const ranked: any[] = []

    for (const p of [...tier1, ...tier2, ...tier3]) {
      if (!seen.has(p.id)) {
        seen.add(p.id)
        ranked.push(p)
      }
    }

    products = ranked.slice(0, 24)
  }

  return (
    <StoreProvider>
      <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">Search Results</p>
            {query ? (
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Results for{" "}
                <span className="text-orange-500">&ldquo;{query}&rdquo;</span>
              </h1>
            ) : (
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                Search our spices
              </h1>
            )}

            {query && (
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                {products.length > 0
                  ? `Found ${products.length} matching product${products.length === 1 ? "" : "s"}`
                  : "No products matched your search."}
              </p>
            )}
          </div>

          {/* Results or Empty */}
          {query && products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-3xl flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">No results found</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mb-8">
                We couldn&apos;t find any spices matching &ldquo;{query}&rdquo;. Try a different term or browse all products.
              </p>
              <Link
                href="/#featured"
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-amber-600 transition-all"
              >
                Browse All Spices
              </Link>
            </div>
          ) : !query ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-3xl flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">What are you looking for?</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
                Use the search bar above to find spices, blends, or combos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

        <Footer />
        <CartSidebar />
        <MobileNav />
      </div>
    </StoreProvider>
  )
}
