import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CO2Dashboard } from "@/components/co2-dashboard"
import { CarbonCalculator } from "@/components/carbon-calculator"
import { ContributionSection } from "@/components/contribution-section"
import { LeaderboardSection } from "@/components/leaderboard-section"
import { WhatIfSimulator } from "@/components/what-if-simulator"
import { AwarenessSection } from "@/components/awareness-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CO2Dashboard />
      <CarbonCalculator />
      <ContributionSection />
      <LeaderboardSection />
      <WhatIfSimulator />
      <AwarenessSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
