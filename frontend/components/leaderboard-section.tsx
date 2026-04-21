"use client"

import { motion } from "framer-motion"
import { Trophy, Medal, Award, Leaf, TrendingUp, Crown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const leaderboardData = [
  { rank: 1, name: "Sarah Chen", co2Offset: 12450, contribution: 2500, badge: "Impact Leader", anonymous: false },
  { rank: 2, name: "Michael Torres", co2Offset: 9800, contribution: 1950, badge: "Climate Warrior", anonymous: false },
  { rank: 3, name: "Anonymous", co2Offset: 8200, contribution: 1640, badge: "Climate Warrior", anonymous: true },
  { rank: 4, name: "Emma Wilson", co2Offset: 7500, contribution: 1500, badge: "Climate Warrior", anonymous: false },
  { rank: 5, name: "James Kim", co2Offset: 6100, contribution: 1220, badge: "Eco Champion", anonymous: false },
  { rank: 6, name: "Anonymous", co2Offset: 5400, contribution: 1080, badge: "Eco Champion", anonymous: true },
  { rank: 7, name: "Olivia Brown", co2Offset: 4800, contribution: 960, badge: "Beginner", anonymous: false },
  { rank: 8, name: "Lucas Martinez", co2Offset: 4200, contribution: 840, badge: "Beginner", anonymous: false },
]

const badges = {
  "Impact Leader": { icon: Crown, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  "Climate Warrior": { icon: Award, color: "text-primary", bg: "bg-primary/10" },
  "Eco Champion": { icon: Medal, color: "text-blue-500", bg: "bg-blue-500/10" },
  "Beginner": { icon: Leaf, color: "text-green-500", bg: "bg-green-500/10" },
}

const impactStats = [
  { label: "Total CO₂ Reduced", value: "2.5M", unit: "kg" },
  { label: "Total Funds Raised", value: "$1.2M", unit: "" },
  { label: "Trees Planted", value: "45K", unit: "+" },
  { label: "Active Contributors", value: "12K", unit: "+" },
]

export function LeaderboardSection() {
  return (
    <section id="leaderboard" className="py-20 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Community Impact
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Leaderboard & Impact Tracker
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            See who&apos;s making the biggest difference. Every contribution counts towards our collective goal.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          id="impact"
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass border-0 shadow-xl text-center">
                <CardContent className="p-6">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-3xl sm:text-4xl font-bold text-primary mb-1"
                  >
                    {stat.value}
                    <span className="text-lg font-normal">{stat.unit}</span>
                  </motion.p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="glass border-0 shadow-xl h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Top Contributors</CardTitle>
                    <CardDescription>Leading the charge for a sustainable future</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboardData.map((user, index) => {
                    const badgeInfo = badges[user.badge as keyof typeof badges]
                    const BadgeIcon = badgeInfo.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                          user.rank <= 3 ? "bg-primary/5" : "hover:bg-muted/50"
                        }`}
                      >
                        {/* Rank */}
                        <div className="w-8 text-center">
                          {user.rank === 1 ? (
                            <span className="text-2xl">🥇</span>
                          ) : user.rank === 2 ? (
                            <span className="text-2xl">🥈</span>
                          ) : user.rank === 3 ? (
                            <span className="text-2xl">🥉</span>
                          ) : (
                            <span className="text-lg font-bold text-muted-foreground">#{user.rank}</span>
                          )}
                        </div>

                        {/* Avatar & Name */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Avatar className="h-10 w-10 border-2 border-primary/20">
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                              {user.anonymous ? "?" : user.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate">
                              {user.anonymous ? "Anonymous Hero" : user.name}
                            </p>
                            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${badgeInfo.bg} ${badgeInfo.color}`}>
                              <BadgeIcon className="h-3 w-3" />
                              {user.badge}
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="hidden sm:flex items-center gap-6 text-sm">
                          <div className="text-right">
                            <p className="font-semibold text-foreground">{user.co2Offset.toLocaleString()} kg</p>
                            <p className="text-xs text-muted-foreground">CO₂ Offset</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">${user.contribution.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Contributed</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Badges & Gamification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Your Score */}
            <Card className="glass border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Sustainability Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-32 h-32">
                      <circle
                        className="text-muted"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                      <motion.circle
                        initial={{ strokeDashoffset: 352 }}
                        whileInView={{ strokeDashoffset: 352 * (1 - 0.72) }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-primary"
                        strokeWidth="8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                        strokeDasharray="352"
                        transform="rotate(-90 64 64)"
                      />
                    </svg>
                    <span className="absolute text-3xl font-bold text-foreground">72</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Great progress! Keep it up!</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Next badge:</span>
                    <span className="font-medium text-primary">Climate Warrior</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "72%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">280 kg more to unlock</p>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="glass border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievement Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(badges).map(([name, { icon: Icon, color, bg }], index) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-3 rounded-xl ${bg} text-center cursor-pointer transition-all ${
                        index > 1 ? "opacity-40" : ""
                      }`}
                    >
                      <Icon className={`h-8 w-8 ${color} mx-auto mb-2`} />
                      <p className={`text-xs font-medium ${color}`}>{name}</p>
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
