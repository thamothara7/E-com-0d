import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Masala & Co. — Authentic Tamil Nadu Spices & Mixes',
  description: 'Pure, handcrafted spice mixes from Tamil Nadu. Discover authentic Sambar powder, Biryani masala, and traditional South Indian cooking essentials. Premium quality assured.',
  keywords: ["Tamil Nadu spices", "South Indian Masala", "Traditional Madurai Spices", "Authentic Sambar Powder", "Handcrafted Spice Mixes", "Tamil Cooking Essentials"],
  generator: 'v0.app',
  icons: {
    icon: '/images/MAGHIZSUVAI - FINAL LOGO DESIGN.png',
    apple: '/images/MAGHIZSUVAI - FINAL LOGO DESIGN.png',
  },
}

import { SessionProvider } from 'next-auth/react'
import { StoreProvider } from '@/lib/store'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <SessionProvider>
          <StoreProvider>
            {children}
            <Analytics />
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
