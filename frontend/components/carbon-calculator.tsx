"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Car,
  Plane,
  Home,
  Utensils,
  ShoppingBag,
  Leaf,
  ArrowRight,
  ArrowLeft,
  Check,
  Lightbulb,
  Bus,
  Wind,
  Recycle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

const steps = [
  {
    id: "transport",
    title: "Transportation",
    icon: Car,
    description: "How do you usually get around?",
  },
  {
    id: "home",
    title: "Home Energy",
    icon: Home,
    description: "Your household energy consumption",
  },
  {
    id: "diet",
    title: "Diet & Food",
    icon: Utensils,
    description: "Your eating habits",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    icon: ShoppingBag,
    description: "Shopping and consumption patterns",
  },
]

const recommendations = [
  {
    icon: Bus,
    title: "Switch to Public Transport",
    description: "Use buses or trains for daily commute",
    impact: "Reduce 2.4 tons CO₂/year",
    savings: "45%",
  },
  {
    icon: Wind,
    title: "Renewable Energy",
    description: "Switch to a green energy provider",
    impact: "Reduce 1.8 tons CO₂/year",
    savings: "35%",
  },
  {
    icon: Leaf,
    title: "Plant-Based Days",
    description: "Try meatless Mondays and Thursdays",
    impact: "Reduce 0.8 tons CO₂/year",
    savings: "15%",
  },
  {
    icon: Recycle,
    title: "Reduce & Recycle",
    description: "Minimize single-use plastics",
    impact: "Reduce 0.5 tons CO₂/year",
    savings: "10%",
  },
]

export function CarbonCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answers, setAnswers] = useState({
    carMiles: 50,
    flights: 2,
    electricityBill: 100,
    gasUsage: 50,
    meatMeals: 7,
    localFood: 30,
    newClothes: 10,
    recycling: 50,
  })

  const totalFootprint = useMemo(() => {
    const transport = answers.carMiles * 0.01 + answers.flights * 0.5
    const home = answers.electricityBill * 0.005 + answers.gasUsage * 0.008
    const diet = answers.meatMeals * 0.15 - answers.localFood * 0.002
    const lifestyle = answers.newClothes * 0.05 - answers.recycling * 0.002
    return Math.max(0, (transport + home + diet + lifestyle) * 12).toFixed(1)
  }, [answers])

  const averageFootprint = 12.5
  const comparison = ((parseFloat(totalFootprint) / averageFootprint) * 100).toFixed(0)

  const handleSliderChange = (key: keyof typeof answers, value: number[]) => {
    setAnswers((prev) => ({ ...prev, [key]: value[0] }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (showResults) {
      setShowResults(false)
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const resetCalculator = () => {
    setCurrentStep(0)
    setShowResults(false)
    setAnswers({
      carMiles: 50,
      flights: 2,
      electricityBill: 100,
      gasUsage: 50,
      meatMeals: 7,
      localFood: 30,
      newClothes: 10,
      recycling: 50,
    })
  }

  return (
    <section id="calculator" className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Personal Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Calculate Your Carbon Footprint
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Answer a few questions to understand your environmental impact and get personalized recommendations.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          {!showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-sm font-medium text-primary">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </span>
              </div>
              <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass border-0 shadow-xl">
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto p-4 rounded-2xl bg-primary/10 w-fit mb-4">
                      {(() => {
                        const StepIcon = steps[currentStep].icon
                        return <StepIcon className="h-8 w-8 text-primary" />
                      })()}
                    </div>
                    <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
                    <CardDescription className="text-base">{steps[currentStep].description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 pt-6">
                    {currentStep === 0 && (
                      <>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Weekly car miles</label>
                            <span className="text-sm font-bold text-primary">{answers.carMiles} miles</span>
                          </div>
                          <Slider
                            value={[answers.carMiles]}
                            onValueChange={(v) => handleSliderChange("carMiles", v)}
                            max={300}
                            step={5}
                            className="py-4"
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Flights per year</label>
                            <span className="text-sm font-bold text-primary">{answers.flights} flights</span>
                          </div>
                          <Slider
                            value={[answers.flights]}
                            onValueChange={(v) => handleSliderChange("flights", v)}
                            max={20}
                            step={1}
                            className="py-4"
                          />
                        </div>
                      </>
                    )}
                    {currentStep === 1 && (
                      <>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Monthly electricity bill</label>
                            <span className="text-sm font-bold text-primary">${answers.electricityBill}</span>
                          </div>
                          <Slider
                            value={[answers.electricityBill]}
                            onValueChange={(v) => handleSliderChange("electricityBill", v)}
                            max={500}
                            step={10}
                            className="py-4"
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Gas/heating usage (%)</label>
                            <span className="text-sm font-bold text-primary">{answers.gasUsage}%</span>
                          </div>
                          <Slider
                            value={[answers.gasUsage]}
                            onValueChange={(v) => handleSliderChange("gasUsage", v)}
                            max={100}
                            step={5}
                            className="py-4"
                          />
                        </div>
                      </>
                    )}
                    {currentStep === 2 && (
                      <>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Meat meals per week</label>
                            <span className="text-sm font-bold text-primary">{answers.meatMeals} meals</span>
                          </div>
                          <Slider
                            value={[answers.meatMeals]}
                            onValueChange={(v) => handleSliderChange("meatMeals", v)}
                            max={21}
                            step={1}
                            className="py-4"
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Local/seasonal food (%)</label>
                            <span className="text-sm font-bold text-primary">{answers.localFood}%</span>
                          </div>
                          <Slider
                            value={[answers.localFood]}
                            onValueChange={(v) => handleSliderChange("localFood", v)}
                            max={100}
                            step={5}
                            className="py-4"
                          />
                        </div>
                      </>
                    )}
                    {currentStep === 3 && (
                      <>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">New clothing items/month</label>
                            <span className="text-sm font-bold text-primary">{answers.newClothes} items</span>
                          </div>
                          <Slider
                            value={[answers.newClothes]}
                            onValueChange={(v) => handleSliderChange("newClothes", v)}
                            max={30}
                            step={1}
                            className="py-4"
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Recycling habits (%)</label>
                            <span className="text-sm font-bold text-primary">{answers.recycling}%</span>
                          </div>
                          <Slider
                            value={[answers.recycling]}
                            onValueChange={(v) => handleSliderChange("recycling", v)}
                            max={100}
                            step={5}
                            className="py-4"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between pt-4">
                      <Button
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                        {currentStep === steps.length - 1 ? "See Results" : "Next"}
                        {currentStep === steps.length - 1 ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="glass border-0 shadow-xl overflow-hidden">
                  <div className="bg-primary/10 p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="inline-block p-6 rounded-full bg-card shadow-lg mb-4"
                    >
                      <Leaf className="h-12 w-12 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Your Carbon Footprint</h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-5xl font-bold text-primary mb-2"
                    >
                      {totalFootprint}
                      <span className="text-xl font-normal text-muted-foreground ml-2">tons CO₂/year</span>
                    </motion.p>
                    <p className="text-muted-foreground">
                      {parseFloat(comparison) > 100 
                        ? `${(parseFloat(comparison) - 100).toFixed(0)}% above average`
                        : `${(100 - parseFloat(comparison)).toFixed(0)}% below average`
                      }
                    </p>
                  </div>
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Your footprint</span>
                        <span className="text-sm text-muted-foreground">Average: {averageFootprint} tons</span>
                      </div>
                      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(parseFloat(comparison), 150)}%` }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                          className={`absolute h-full rounded-full ${
                            parseFloat(comparison) > 100 ? "bg-destructive" : "bg-primary"
                          }`}
                          style={{ maxWidth: "100%" }}
                        />
                        <div
                          className="absolute h-full w-0.5 bg-foreground/50"
                          style={{ left: `${(100 / 150) * 100}%` }}
                        />
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Personalized Recommendations
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      {recommendations.map((rec, index) => (
                        <motion.div
                          key={rec.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <rec.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-foreground">{rec.title}</h5>
                              <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-primary font-medium">{rec.impact}</span>
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                  -{rec.savings}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Button variant="outline" onClick={resetCalculator} className="w-full sm:w-auto">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Recalculate
                      </Button>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto" asChild>
                        <a href="#contribute">
                          Offset My Footprint
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
