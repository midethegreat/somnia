"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Award, TrendingUp, Target, Zap } from "lucide-react"

interface UserStatsProps {
  walletAddress?: string
}

export default function UserStats({ walletAddress }: UserStatsProps) {
  const [stats] = useState({
    totalWins: 24,
    totalLosses: 8,
    totalProfit: 4250,
    winRate: 75,
    currentStreak: 3,
    bestStreak: 7,
    totalBetsPlaced: 32,
    averageBetSize: 145.3,
    totalVolume: 4650,
  })

  const chartData = [
    { date: "Mon", profit: 250 },
    { date: "Tue", profit: 420 },
    { date: "Wed", profit: 180 },
    { date: "Thu", profit: 590 },
    { date: "Fri", profit: 820 },
    { date: "Sat", profit: 490 },
    { date: "Sun", profit: 510 },
  ]

  const categoryData = [
    { name: "Crypto", value: 45, fill: "#00b854" },
    { name: "Sports", value: 30, fill: "#0097a7" },
    { name: "Economics", value: 15, fill: "#d32f2f" },
    { name: "Weather", value: 10, fill: "#7b1fa2" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Your Stats</h1>
          <p className="text-muted-foreground mt-2">
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Your performance metrics"}
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Wins</p>
              <Award className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.totalWins}</p>
            <p className="text-xs text-muted-foreground mt-2">{stats.totalLosses} losses</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <Target className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.winRate}%</p>
            <p className="text-xs text-muted-foreground mt-2">Very solid performance</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Profit</p>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary">${stats.totalProfit}</p>
            <p className="text-xs text-muted-foreground mt-2">Net earnings</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.currentStreak}</p>
            <p className="text-xs text-muted-foreground mt-2">Best: {stats.bestStreak}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-8 lg:grid-cols-3 mb-8">
          {/* Profit Over Time */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Profit Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--primary)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bet Categories */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Bets by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-xs">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.fill }}></div>
                    <span className="text-muted-foreground">{cat.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">Bets Placed</p>
            <p className="text-2xl font-bold text-foreground">{stats.totalBetsPlaced}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">Avg Bet Size</p>
            <p className="text-2xl font-bold text-foreground">${stats.averageBetSize.toFixed(2)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Volume</p>
            <p className="text-2xl font-bold text-foreground">${(stats.totalVolume / 1000).toFixed(1)}k</p>
          </div>
        </div>
      </div>
    </div>
  )
}
