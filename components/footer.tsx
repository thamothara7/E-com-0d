import Link from "next/link";
import { ChefHat, Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const footerLinks = {
    Shop: ["Spice Mixes", "Ready Mixes", "Combo Packs", "Best Sellers", "New Arrivals"],
    Help: ["Track Order", "Returns & Refunds", "Shipping Info", "FAQs", "Contact Us"],
    Company: ["About Us", "Our Story", "Sustainability", "Blog", "Press"],
  };

  return (
    <footer id="about" className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <ChefHat className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-serif font-bold text-lg text-background tracking-tight">
                Masala <span className="text-primary">&amp; Co.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs opacity-70">
              Crafting authentic, premium-quality spice blends and cooking mixes since 2018. Bringing the world&apos;s flavors to your kitchen.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  aria-label="Social media link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-background text-sm mb-4">{section}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-xs sm:text-sm opacity-60 hover:opacity-100 hover:text-primary transition-all duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap gap-6 py-6 border-t border-white/10 border-b mb-8">
          {[
            { icon: Mail, text: "hello@masalaandco.com" },
            { icon: Phone, text: "+1 (555) 012-3456" },
            { icon: MapPin, text: "123 Spice Lane, New York, NY 10001" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs opacity-60">
              <Icon className="w-4 h-4 text-primary shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-50">
          <p>&copy; {new Date().getFullYear()} Masala &amp; Co. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
