"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Leaf, Heart } from "lucide-react"

const footerLinks = {
  Platform: [
    { name: "Dashboard", href: "#dashboard" },
    { name: "Calculator", href: "#calculator" },
    { name: "Simulator", href: "#simulator" },
    { name: "Leaderboard", href: "#leaderboard" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "API Access", href: "#" },
    { name: "Research Papers", href: "#" },
    { name: "Case Studies", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
    { name: "Contact", href: "#contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Data Sources", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 rounded-xl bg-primary/20"
              >
                <Leaf className="h-6 w-6 text-primary" />
              </motion.div>
              <span className="text-xl font-semibold">
                Carbon<span className="text-primary">IQ</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm mb-6 max-w-xs">
              AI-powered platform helping individuals and organizations track, predict, and reduce their carbon footprint.
            </p>
            <p className="text-xs text-background/50">
              Disclaimer: Predictions are based on AI models and should be used for educational purposes. 
              Actual results may vary based on real-world conditions.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-background mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/60">
              &copy; {new Date().getFullYear()} CarbonIQ. All rights reserved.
            </p>
            <p className="text-sm text-background/60 flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for the planet
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
