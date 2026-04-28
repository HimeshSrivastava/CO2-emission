"use client";

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

import { useEffect, useState } from "react";
import PaymentButton from "@/components/PaymentButton";

export default function HomePage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?._id) {
      setUserId(user._id);
    }
  }, []);
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CO2Dashboard />
      <CarbonCalculator />
      <PaymentButton />
      <LeaderboardSection />
      <WhatIfSimulator />
      <AwarenessSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
