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
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const contributionTiers = [
  {
    amount: 10,
    title: "Start Small 🌱",
    co2Offset: "50 kg",
    trees: 1,
    icon: TreePine,
    popular: false,
  },
  {
    amount: 25,
    title: "Grow Impact 🌿",
    co2Offset: "150 kg",
    trees: 3,
    icon: TreePine,
    popular: false,
  },
  {
    amount: 50,
    title: "Make a Difference 🌳",
    co2Offset: "350 kg",
    trees: 7,
    icon: Wind,
    popular: true,
  },
  {
    amount: 100,
    title: "Create Real Change 🌍",
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
  const [amount, setAmount] = useState<number | "">("");

  const handleContribute = async () => {
  console.log("Sending amount:", amount);

  if (!amount || Number(amount) <= 0) {
    alert("Invalid amount");
    return;
  }

  const res = await fetch("http://localhost:4000/api/payment/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ amount: Number(amount) }),
  });

  if (!res.ok) {
    console.log("Backend failed");
    return;
  }

  const order = await res.json();
  console.log("Order from backend:", order);

  // 🔥 Razorpay check
  if (!(window as any).Razorpay) {
    alert("Razorpay not loaded");
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    amount: order.amount,
    currency: order.currency,
    order_id: order.id,

    handler: async function (response: any) {
      console.log("Payment success:", response);
    },

    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open(); // 🔥 MOST IMPORTANT LINE

  }

  const finalAmount = (selectedTier ?? parseInt(customAmount)) || 0
  const estimatedCO2 = (finalAmount * 7).toFixed(0)
  const estimatedTrees = Math.floor(finalAmount / 5)

  return (
    <section id="contribute" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Make an Impact
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Make Your Impact Today 🌍
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Support real climate projects, plant trees, and reduce carbon emissions — your contribution starts making a difference instantly.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!showConfirmation ? (
            <div className="max-w-5xl mx-auto">

              {/* Tiers */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {contributionTiers.map((tier) => (
                  <Card
                    key={tier.amount}
                    className={`cursor-pointer ${
                      selectedTier === tier.amount
                        ? "border-primary shadow-lg scale-105"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setAmount(tier.amount)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="p-3 bg-primary/10 rounded-xl mb-4 inline-block">
                        <tier.icon className="h-6 w-6 text-primary" />
                      </div>

                      <p className="text-sm text-muted-foreground">{tier.title}</p>
                      <p className="text-3xl font-bold">${tier.amount}</p>

                      <p className="text-sm mt-2">🌱 Offset {tier.co2Offset}</p>
                      <p className="text-sm">🌳 Plant {tier.trees} trees</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Custom Amount */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <label className="text-sm font-medium mb-2 block">
                    Choose Your Contribution
                  </label>

                  <Input
  type="number"
  placeholder="Enter amount"
  value={amount || ""}
  onChange={(e) => setAmount(Number(e.target.value))}
/>
                  
                </CardContent>
              </Card>

              {/* Trust */}
              <div className="flex justify-center gap-6 text-sm text-muted-foreground mb-8">
                <span>100% Secure Payments</span>
                <span>Verified Projects</span>
                <span>Real Impact</span>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button
                  onClick={handleContribute}
                  // disabled={finalAmount <= 0 || isProcessing}
                  className="px-10 py-6 text-lg"
                >
                  {isProcessing
                    ? "Processing..."
                    : `Support Now $${amount || 0} 🚀`}
                </Button>

                <p className="text-sm mt-3">
                  Your contribution directly supports real-world climate solutions.
                </p>

                <p className="text-xs text-muted-foreground mt-2">
                  Join thousands contributing to a greener planet 🌱
                </p>
              </div>

            </div>
          ) : (
            <div className="max-w-lg mx-auto text-center">

              <h3 className="text-2xl font-bold mb-2">
                You're Making a Real Impact! 🌍
              </h3>

              <p className="text-muted-foreground mb-6">
                Your contribution is already helping reduce carbon emissions and support sustainability projects.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-2xl font-bold">{estimatedCO2} kg</p>
                  <p>CO₂ Offset</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{estimatedTrees}</p>
                  <p>Trees Planted</p>
                </div>
              </div>

              <Button className="w-full mb-3">
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
                Contribute Again
              </Button>

            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}