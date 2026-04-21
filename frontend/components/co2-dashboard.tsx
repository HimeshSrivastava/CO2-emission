"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown, Globe, Factory, Fuel, Users, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const emissionData = [
  { month: "Jan", current: 420, predicted: 415, optimized: 380 },
  { month: "Feb", current: 425, predicted: 420, optimized: 375 },
  { month: "Mar", current: 418, predicted: 412, optimized: 370 },
  { month: "Apr", current: 430, predicted: 422, optimized: 365 },
  { month: "May", current: 435, predicted: 425, optimized: 360 },
  { month: "Jun", current: 440, predicted: 430, optimized: 355 },
  { month: "Jul", current: 438, predicted: 428, optimized: 350 },
  { month: "Aug", current: 445, predicted: 432, optimized: 345 },
  { month: "Sep", current: 450, predicted: 435, optimized: 340 },
  { month: "Oct", current: 448, predicted: 430, optimized: 335 },
  { month: "Nov", current: 455, predicted: 428, optimized: 330 },
  { month: "Dec", current: 460, predicted: 425, optimized: 325 },
]

const sectorData = [
  { sector: "Energy", emissions: 35, color: "hsl(var(--chart-1))" },
  { sector: "Transport", emissions: 28, color: "hsl(var(--chart-2))" },
  { sector: "Industry", emissions: 22, color: "hsl(var(--chart-3))" },
  { sector: "Buildings", emissions: 10, color: "hsl(var(--chart-4))" },
  { sector: "Other", emissions: 5, color: "hsl(var(--chart-5))" },
]

const regions = [
  "Global", "North America", "Europe", "Asia Pacific", "Latin America", "Africa", "Middle East"
]

const insights = [
  {
    icon: Factory,
    title: "Industrial Output Up",
    description: "Manufacturing activity increased 8% this quarter",
    trend: "up",
    value: "+8%",
  },
  {
    icon: Fuel,
    title: "Fuel Consumption Surge",
    description: "Transportation fuel usage increased 12% this month",
    trend: "up",
    value: "+12%",
  },
  {
    icon: Users,
    title: "Population Growth",
    description: "Urban areas saw 3% population increase",
    trend: "up",
    value: "+3%",
  },
  {
    icon: TrendingDown,
    title: "Renewable Adoption",
    description: "Solar and wind capacity grew by 15%",
    trend: "down",
    value: "+15%",
  },
]

export function CO2Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState("Global")
  const [isRegionOpen, setIsRegionOpen] = useState(false)

  return (
    <section id="dashboard" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Real-Time Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            CO₂ Emissions Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Monitor global emissions in real-time with AI-powered predictions and scenario comparisons.
          </p>
        </motion.div>

        {/* Region Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <Button
              variant="outline"
              className="rounded-full px-6 py-5 gap-2"
              onClick={() => setIsRegionOpen(!isRegionOpen)}
            >
              <Globe className="h-4 w-4" />
              {selectedRegion}
              <ChevronDown className={`h-4 w-4 transition-transform ${isRegionOpen ? "rotate-180" : ""}`} />
            </Button>
            {isRegionOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-10"
              >
                {regions.map((region) => (
                  <button
                    key={region}
                    className={`w-full px-4 py-2 text-left hover:bg-primary/10 transition-colors ${
                      selectedRegion === region ? "bg-primary/10 text-primary" : ""
                    }`}
                    onClick={() => {
                      setSelectedRegion(region)
                      setIsRegionOpen(false)
                    }}
                  >
                    {region}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Main Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Emission Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="glass border-0 shadow-xl h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Emission Trends & Predictions</CardTitle>
                    <CardDescription>Current trend vs AI prediction vs optimized scenario</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-chart-1" />
                      Current
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-chart-2" />
                      Predicted
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-chart-5" />
                      Optimized
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={emissionData}>
                    <defs>
                      <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="optimizedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="current"
                      stroke="hsl(var(--chart-1))"
                      fill="url(#currentGradient)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="predicted"
                      stroke="hsl(var(--chart-2))"
                      fill="url(#predictedGradient)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Area
                      type="monotone"
                      dataKey="optimized"
                      stroke="hsl(var(--chart-5))"
                      fill="url(#optimizedGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sector Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass border-0 shadow-xl h-full">
              <CardHeader>
                <CardTitle className="text-xl">Emissions by Sector</CardTitle>
                <CardDescription>Percentage breakdown by industry</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={sectorData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="sector" type="category" stroke="hsl(var(--muted-foreground))" width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                      }}
                      formatter={(value) => [`${value}%`, "Emissions"]}
                    />
                    <Bar dataKey="emissions" fill="hsl(var(--chart-1))" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="space-y-3 mt-4">
                  {sectorData.map((sector, index) => (
                    <div key={sector.sector} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: `hsl(var(--chart-${index + 1}))` }}
                        />
                        <span className="text-sm">{sector.sector}</span>
                      </div>
                      <span className="text-sm font-medium">{sector.emissions}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="insights"
        >
          <Card className="glass border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <span className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </span>
                AI-Powered Insights
              </CardTitle>
              <CardDescription>Why emissions are changing today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2 rounded-lg ${insight.trend === "up" ? "bg-destructive/10" : "bg-primary/10"}`}>
                        <insight.icon
                          className={`h-5 w-5 ${insight.trend === "up" ? "text-destructive" : "text-primary"}`}
                        />
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          insight.trend === "up" ? "text-destructive" : "text-primary"
                        }`}
                      >
                        {insight.value}
                      </span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
