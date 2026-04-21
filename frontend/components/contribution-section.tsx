"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  TreePine,
  Wind,
  Droplets,
  Check,
  Download,
  ArrowRight,
  Shield,
  Globe,
  Building2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const contributionTiers = [
  {
    amount: 10,
    title: "Seedling",
    co2Offset: "50 kg",
    trees: 1,
    icon: TreePine,
    popular: false,
  },
  {
    amount: 25,
    title: "Sapling",
    co2Offset: "150 kg",
    trees: 3,
    icon: TreePine,
    popular: false,
  },
  {
    amount: 50,
    title: "Growth",
    co2Offset: "350 kg",
    trees: 7,
    icon: Wind,
    popular: true,
  },
  {
    amount: 100,
    title: "Impact",
    co2Offset: "800 kg",
    trees: 15,
    icon: Globe,
    popular: false,
  },
]

const ngoPartners = [
  {
    name: "One Tree Planted",
    description: "Reforestation projects worldwide",
    logo: TreePine,
  },
  {
    name: "Ocean Cleanup",
    description: "Removing plastic from oceans",
    logo: Droplets,
  },
  {
    name: "Rainforest Alliance",
    description: "Protecting biodiversity",
    logo: Wind,
  },
]

export function ContributionSection() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleContribute = () => {
    const amount = selectedTier ?? parseInt(customAmount)
    if (amount && amount > 0) {
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setShowConfirmation(true)
      }, 1500)
    }
  }

  const finalAmount = (selectedTier ?? parseInt(customAmount)) || 0
  const estimatedCO2 = (finalAmount * 7).toFixed(0)
  const estimatedTrees = Math.floor(finalAmount / 5)

  return (
    <section id="contribute" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Make an Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Contribute to a Greener Future
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Every contribution directly funds verified carbon offset projects and reforestation initiatives.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showConfirmation ? (
            <motion.div
              key="contribution-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto"
            >
              {/* Contribution Tiers */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {contributionTiers.map((tier, index) => (
                  <motion.div
                    key={tier.amount}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-300 h-full ${
                        selectedTier === tier.amount
                          ? "border-primary shadow-lg shadow-primary/20 scale-105"
                          : "border-border hover:border-primary/50"
                      } ${tier.popular ? "relative" : ""}`}
                      onClick={() => {
                        setSelectedTier(tier.amount)
                        setCustomAmount("")
                      }}
                    >
                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          Most Popular
                        </div>
                      )}
                      <CardContent className="p-6 text-center">
                        <div className={`mx-auto p-3 rounded-xl w-fit mb-4 ${
                          selectedTier === tier.amount ? "bg-primary/20" : "bg-primary/10"
                        }`}>
                          <tier.icon className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{tier.title}</p>
                        <p className="text-3xl font-bold text-foreground mb-4">${tier.amount}</p>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center justify-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            Offset {tier.co2Offset} CO₂
                          </p>
                          <p className="flex items-center justify-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            Plant {tier.trees} trees
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Custom Amount */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <Card className="glass border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex-1 w-full">
                        <label className="text-sm font-medium mb-2 block">Custom Amount</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value)
                              setSelectedTier(null)
                            }}
                            className="pl-8 h-12 text-lg"
                          />
                        </div>
                      </div>
                      {finalAmount > 0 && (
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{estimatedCO2} kg</p>
                            <p className="text-muted-foreground">CO₂ offset</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{estimatedTrees}</p>
                            <p className="text-muted-foreground">Trees planted</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* NGO Partners */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Our Verified Partners
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {ngoPartners.map((partner, index) => (
                    <Card key={partner.name} className="border-border">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <partner.logo className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{partner.name}</p>
                          <p className="text-sm text-muted-foreground">{partner.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Verified Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>Global Impact</span>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-12 py-6 text-lg shadow-lg shadow-primary/25"
                  onClick={handleContribute}
                  disabled={finalAmount <= 0 || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="mr-2"
                      >
                        <Heart className="h-5 w-5" />
                      </motion.div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-5 w-5" />
                      Contribute ${finalAmount || "0"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  100% of your contribution goes directly to climate projects
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg mx-auto"
            >
              <Card className="glass border-0 shadow-xl text-center overflow-hidden">
                <div className="bg-primary/10 p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-block p-6 rounded-full bg-card shadow-lg mb-4"
                  >
                    <Check className="h-12 w-12 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">Your contribution makes a real difference</p>
                </div>
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-primary/5">
                      <p className="text-3xl font-bold text-primary">{estimatedCO2} kg</p>
                      <p className="text-sm text-muted-foreground">CO₂ Offset</p>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/5">
                      <p className="text-3xl font-bold text-primary">{estimatedTrees}</p>
                      <p className="text-sm text-muted-foreground">Trees Planted</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setShowConfirmation(false)
                        setSelectedTier(null)
                        setCustomAmount("")
                      }}
                    >
                      Make Another Contribution
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
