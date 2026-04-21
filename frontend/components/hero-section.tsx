"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Calculator, Heart, TrendingDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [target])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

function LiveCO2Counter() {
  const [co2Level, setCo2Level] = useState(421.5)

  useEffect(() => {
    const interval = setInterval(() => {
      setCo2Level((prev) => {
        const change = (Math.random() - 0.48) * 0.1
        return Math.round((prev + change) * 100) / 100
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-2xl p-4 sm:p-6 inline-flex items-center gap-4"
    >
      <div className="p-3 rounded-xl bg-primary/10">
        <Globe className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-xs sm:text-sm text-muted-foreground">Global CO₂ Level (ppm)</p>
        <motion.p
          key={co2Level}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="text-2xl sm:text-3xl font-bold text-foreground"
        >
          {co2Level}
        </motion.p>
      </div>
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <TrendingDown className="h-5 w-5 text-primary" />
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-3xl" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-32 right-20 hidden lg:block"
      >
        <div className="glass rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chart-1/20">
              <TrendingDown className="h-5 w-5 text-chart-1" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Emissions Reduced</p>
              <p className="font-semibold text-foreground">-12.4%</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute bottom-40 left-20 hidden lg:block"
      >
        <div className="glass rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-chart-2/20">
              <Heart className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Trees Planted</p>
              <p className="font-semibold text-foreground">1.2M+</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            AI-Powered Climate Intelligence
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance"
          >
            Track. Predict.{" "}
            <span className="text-primary">Reduce.</span>
            <br />
            <span className="text-muted-foreground">Act on CO₂ Emissions.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty"
          >
            Harness the power of AI-driven emission forecasting to understand, predict, 
            and reduce your carbon footprint. Join thousands making a measurable impact on climate change.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/25 group"
              asChild
            >
              <Link href="#dashboard">
                <BarChart3 className="mr-2 h-5 w-5" />
                Explore Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg border-2"
              asChild
            >
              <Link href="#calculator">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Your Impact
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="rounded-full px-8 py-6 text-lg text-primary hover:bg-primary/10"
              asChild
            >
              <Link href="#contribute">
                <Heart className="mr-2 h-5 w-5" />
                Contribute Now
              </Link>
            </Button>
          </motion.div>

          {/* Live CO2 Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <LiveCO2Counter />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
          >
            {[
              { value: 50000, suffix: "+", label: "Active Users" },
              { value: 2500000, suffix: "", label: "Tons CO₂ Tracked" },
              { value: 180, suffix: "+", label: "Countries" },
              { value: 98, suffix: "%", label: "Accuracy Rate" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass rounded-2xl p-4 sm:p-6"
              >
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-3 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
