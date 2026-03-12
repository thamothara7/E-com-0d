import { Metadata } from "next"
import Link from "next/link"
import { ChefHat, Heart, Leaf, Star, Phone, Mail, MapPin } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StoreProvider } from "@/lib/store"
import { CartSidebar } from "@/components/cart-sidebar"
import { MobileNav } from "@/components/mobile-nav"

export const metadata: Metadata = {
  title: "About Us | Masala & Co.",
  description: "Learn about Masala & Co., our story, our values, and the people behind your favourite spices.",
}

const values = [
  {
    icon: Leaf,
    title: "100% Natural",
    desc: "No artificial colours, no preservatives — just pure, sourced-from-origin spices and herbs.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    desc: "Every blend is crafted by our in-house team using traditional recipes passed down through generations.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    desc: "We work directly with trusted farmers to ensure every batch meets our strict freshness standards.",
  },
]

export default function AboutPage() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <Navbar />

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 py-24 md:py-32">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-orange-300/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-amber-300/20 rounded-full blur-[120px]" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg mb-8">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-zinc-900 dark:text-zinc-50 mb-6 leading-tight">
              Bringing the World&apos;s<br />
              <span className="text-orange-500">Flavours to Your Kitchen</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Since 2018, Masala &amp; Co. has been crafting authentic, premium-quality spice blends that make every
              meal an experience worth savouring.
            </p>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section id="story" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <span className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-4 block">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                From a small kitchen to a thousand tables
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <p>
                  It started in 2018 with a simple frustration — store-bought masalas that tasted nothing like
                  grandmother&apos;s cooking. Our founder, Kavitha, began grinding her own blends at home and sharing
                  them with neighbours.
                </p>
                <p>
                  Word spread fast. What began as a weekend hobby quickly became a passion project, and then a
                  full-fledged business serving thousands of happy kitchens across India.
                </p>
                <p>
                  Today, every batch of Masala &amp; Co. products is still made with the same care, using spices
                  traceable to named farms in Rajasthan, Kerala, and Andhra Pradesh.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                <p className="text-5xl font-serif font-bold text-orange-600 dark:text-orange-400">6+</p>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-2">Years in Business</p>
              </div>
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                <p className="text-5xl font-serif font-bold text-amber-600 dark:text-amber-400">50+</p>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-2">Unique Blends</p>
              </div>
              <div className="aspect-square bg-gradient-to-br from-stone-100 to-orange-50 dark:from-stone-900/30 dark:to-orange-900/30 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                <p className="text-5xl font-serif font-bold text-stone-600 dark:text-stone-400">10k+</p>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-2">Happy Customers</p>
              </div>
              <div className="aspect-square bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                <p className="text-5xl font-serif font-bold text-green-600 dark:text-green-400">100%</p>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-2">Natural, No Additives</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="bg-orange-50/60 dark:bg-zinc-900/60 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-4 block">Why Us</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
                What we stand for
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="bg-white dark:bg-zinc-800 rounded-3xl p-8 shadow-sm border border-orange-100/50 dark:border-zinc-700/50">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-5">
                    <v.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">{v.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-4 block">Contact</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
              Get in touch
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-3 max-w-md mx-auto">
              Have a question, feedback, or wholesale enquiry? We&apos;d love to hear from you.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Mail, label: "Email Us", value: "hello@masalaandco.com", href: "mailto:hello@masalaandco.com" },
              { icon: Phone, label: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210" },
              { icon: MapPin, label: "Visit Us", value: "Chennai, Tamil Nadu, India", href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="group flex flex-col items-center text-center p-6 bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-sm hover:shadow-md hover:border-orange-200 dark:hover:border-orange-800 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">{label}</p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{value}</p>
              </a>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/#featured"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-full font-semibold shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ChefHat className="w-5 h-5" />
              Shop Our Spices
            </Link>
          </div>
        </section>

        <Footer />
        <CartSidebar />
        <MobileNav />
      </div>
    </StoreProvider>
  )
}
