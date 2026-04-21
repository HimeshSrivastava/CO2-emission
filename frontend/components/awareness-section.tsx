"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  ChevronDown,
  Scale,
  Lightbulb,
  Home,
  ShoppingBag,
  Utensils,
  Car,
  Recycle,
  Droplets,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const governmentPolicies = [
  {
    title: "Paris Agreement Goals",
    description: "Limit global warming to 1.5°C above pre-industrial levels by reducing greenhouse gas emissions.",
    details: "Countries commit to nationally determined contributions (NDCs) and regular reporting on progress. The agreement includes financial support for developing nations.",
  },
  {
    title: "Carbon Pricing Mechanisms",
    description: "Governments implement carbon taxes or cap-and-trade systems to reduce emissions.",
    details: "Carbon pricing puts a cost on emissions, incentivizing businesses and consumers to reduce their carbon footprint through cleaner alternatives.",
  },
  {
    title: "Renewable Energy Mandates",
    description: "Requirements for utilities to generate a percentage of power from renewable sources.",
    details: "Many countries have set targets of 50-100% renewable energy by 2050, driving investment in solar, wind, and other clean energy technologies.",
  },
  {
    title: "Electric Vehicle Incentives",
    description: "Tax credits and subsidies to encourage adoption of zero-emission vehicles.",
    details: "Incentives include purchase rebates, charging infrastructure investment, and phase-out dates for internal combustion engine sales.",
  },
]

const dailyTips = [
  {
    icon: Home,
    category: "At Home",
    tips: [
      "Switch to LED bulbs - saves 75% energy",
      "Unplug devices when not in use",
      "Set thermostat 2° lower in winter, 2° higher in summer",
      "Use cold water for laundry",
    ],
  },
  {
    icon: Car,
    category: "Transportation",
    tips: [
      "Walk or bike for short trips",
      "Use public transport when possible",
      "Carpool with colleagues",
      "Maintain tire pressure for fuel efficiency",
    ],
  },
  {
    icon: Utensils,
    category: "Food & Diet",
    tips: [
      "Reduce meat consumption",
      "Buy local and seasonal produce",
      "Minimize food waste with meal planning",
      "Compost organic waste",
    ],
  },
  {
    icon: ShoppingBag,
    category: "Shopping",
    tips: [
      "Bring reusable bags",
      "Choose products with less packaging",
      "Buy second-hand when possible",
      "Support sustainable brands",
    ],
  },
  {
    icon: Droplets,
    category: "Water Usage",
    tips: [
      "Take shorter showers",
      "Fix leaky faucets promptly",
      "Collect rainwater for plants",
      "Run full loads in dishwasher",
    ],
  },
  {
    icon: Recycle,
    category: "Waste",
    tips: [
      "Recycle paper, plastic, glass, metal",
      "Avoid single-use plastics",
      "Donate instead of throwing away",
      "Choose reusable over disposable",
    ],
  },
]

function PolicyAccordion({
  policy,
  isOpen,
  onToggle,
}: {
  policy: typeof governmentPolicies[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-border rounded-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Scale className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{policy.title}</h4>
            <p className="text-sm text-muted-foreground hidden sm:block">{policy.description}</p>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
              <p className="text-sm text-muted-foreground sm:hidden mb-2">{policy.description}</p>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-foreground">{policy.details}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function AwarenessSection() {
  const [openPolicy, setOpenPolicy] = useState<number | null>(0)

  return (
    <section id="awareness" className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Knowledge Hub
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Awareness & Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Understanding climate policies and daily actions that make a difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Government Policies */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-0 shadow-xl h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Government Policies</CardTitle>
                    <CardDescription>Key climate regulations and commitments</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {governmentPolicies.map((policy, index) => (
                  <PolicyAccordion
                    key={policy.title}
                    policy={policy}
                    isOpen={openPolicy === index}
                    onToggle={() => setOpenPolicy(openPolicy === index ? null : index)}
                  />
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Daily Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-0 shadow-xl h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Daily Sustainability Tips</CardTitle>
                    <CardDescription>Small actions that add up to big impact</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {dailyTips.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-lg bg-primary/10">
                          <category.icon className="h-4 w-4 text-primary" />
                        </div>
                        <h4 className="font-medium text-foreground">{category.category}</h4>
                      </div>
                      <ul className="space-y-2">
                        {category.tips.map((tip) => (
                          <li key={tip} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
