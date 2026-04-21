"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Zap, Car, Sun, Factory, Waves, RotateCcw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

const baselineData = [
  { year: "2024", baseline: 420, projected: 420 },
  { year: "2025", baseline: 425, projected: 420 },
  { year: "2026", baseline: 430, projected: 420 },
  { year: "2027", baseline: 435, projected: 420 },
  { year: "2028", baseline: 440, projected: 420 },
  { year: "2029", baseline: 445, projected: 420 },
  { year: "2030", baseline: 450, projected: 420 },
  { year: "2035", baseline: 475, projected: 420 },
  { year: "2040", baseline: 500, projected: 420 },
  { year: "2050", baseline: 550, projected: 420 },
]

const scenarios = [
  {
    id: "ev",
    name: "EV Adoption",
    icon: Car,
    description: "Electric vehicle market share",
    defaultValue: 15,
    unit: "%",
    max: 100,
    impactFactor: 0.8,
  },
  {
    id: "renewable",
    name: "Renewable Energy",
    icon: Sun,
    description: "Grid powered by renewables",
    defaultValue: 25,
    unit: "%",
    max: 100,
    impactFactor: 1.2,
  },
  {
    id: "industry",
    name: "Industrial Efficiency",
    icon: Factory,
    description: "Manufacturing efficiency gains",
    defaultValue: 10,
    unit: "%",
    max: 50,
    impactFactor: 0.6,
  },
  {
    id: "fuel",
    name: "Fuel Reduction",
    icon: Zap,
    description: "Fossil fuel consumption reduction",
    defaultValue: 5,
    unit: "%",
    max: 75,
    impactFactor: 1.0,
  },
]

export function WhatIfSimulator() {
  const [values, setValues] = useState<Record<string, number>>(() =>
    scenarios.reduce((acc, s) => ({ ...acc, [s.id]: s.defaultValue }), {})
  )

  const projectedData = useMemo(() => {
    const totalImpact = scenarios.reduce((acc, s) => {
      return acc + (values[s.id] / s.max) * s.impactFactor
    }, 0)
    
    const reductionRate = totalImpact * 0.15
    
    return baselineData.map((point, index) => {
      const yearOffset = index
      const reduction = point.baseline * reductionRate * (yearOffset / baselineData.length)
      return {
        ...point,
        projected: Math.max(350, Math.round(point.baseline - reduction)),
      }
    })
  }, [values])

  const totalReduction = useMemo(() => {
    const lastBaseline = baselineData[baselineData.length - 1].baseline
    const lastProjected = projectedData[projectedData.length - 1].projected
    return lastBaseline - lastProjected
  }, [projectedData])

  const handleReset = () => {
    setValues(scenarios.reduce((acc, s) => ({ ...acc, [s.id]: s.defaultValue }), {}))
  }

  return (
    <section id="simulator" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Interactive Simulation
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            What If Scenario Simulator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore how different policy choices and adoption rates could impact global CO₂ levels by 2050.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Adjust Parameters</h3>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <scenario.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">{scenario.name}</h4>
                          <span className="text-lg font-bold text-primary">
                            {values[scenario.id]}
                            {scenario.unit}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      </div>
                    </div>
                    <Slider
                      value={[values[scenario.id]]}
                      onValueChange={([v]) => setValues((prev) => ({ ...prev, [scenario.id]: v }))}
                      max={scenario.max}
                      step={1}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0{scenario.unit}</span>
                      <span>{scenario.max}{scenario.unit}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="glass border-0 shadow-xl h-full">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">Projected CO₂ Levels (ppm)</CardTitle>
                    <CardDescription>Baseline vs Your Scenario</CardDescription>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-muted-foreground" />
                      Baseline
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-primary" />
                      Your Scenario
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={projectedData}>
                    <defs>
                      <linearGradient id="baselineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="projectedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" domain={[340, 560]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="baseline"
                      stroke="hsl(var(--muted-foreground))"
                      fill="url(#baselineGrad)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Area
                      type="monotone"
                      dataKey="projected"
                      stroke="hsl(var(--primary))"
                      fill="url(#projectedGrad)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>

                {/* Impact Summary */}
                <div className="grid sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center p-4 rounded-xl bg-primary/5">
                    <p className="text-3xl font-bold text-primary">{totalReduction}</p>
                    <p className="text-sm text-muted-foreground">ppm Reduction by 2050</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-accent/50">
                    <p className="text-3xl font-bold text-foreground">
                      {Math.round((totalReduction / 130) * 100)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Progress to Net Zero</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary">
                    <Waves className="h-8 w-8 text-primary mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">
                      {totalReduction > 80 ? "On Track" : totalReduction > 40 ? "Making Progress" : "More Effort Needed"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
