"use client"

import { useState } from "react"
import { TrendingUp, Trophy } from "lucide-react"

interface UserStats {
  rank: number
  address: string
  wins: number
  losses: number
  totalProfit: number
  winRate: number
  totalVolume: number
  streak: number
  avatar: string
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<UserStats[]>([
    {
      rank: 1,
      address: "0x742d...8f2e",
      wins: 127,
      losses: 43,
      totalProfit: 4250,
      winRate: 75,
      totalVolume: 18500,
      streak: 8,
      avatar: "🥇",
    },
    {
      rank: 2,
      address: "0x29e4...c51f",
      wins: 98,
      losses: 52,
      totalProfit: 3180,
      winRate: 65,
      totalVolume: 15200,
      streak: 5,
      avatar: "🥈",
    },
    {
      rank: 3,
      address: "0x8f4e...9d3a",
      wins: 89,
      losses: 61,
      totalProfit: 2640,
      winRate: 59,
      totalVolume: 12800,
      streak: 3,
      avatar: "🥉",
    },
    {
      rank: 4,
      address: "0x5c2a...1b8f",
      wins: 76,
      losses: 74,
      totalProfit: 1520,
      winRate: 51,
      totalVolume: 9600,
      streak: 2,
      avatar: "👤",
    },
    {
      rank: 5,
      address: "0x9e7d...4c2b",
      wins: 64,
      losses: 86,
      totalProfit: 890,
      winRate: 43,
      totalVolume: 7400,
      streak: 1,
      avatar: "👤",
    },
    {
      rank: 6,
      address: "0x1a2b...3c4d",
      wins: 58,
      losses: 92,
      totalProfit: 420,
      winRate: 39,
      totalVolume: 5800,
      streak: 0,
      avatar: "👤",
    },
    {
      rank: 7,
      address: "0x4e5f...6a7b",
      wins: 52,
      losses: 98,
      totalProfit: 180,
      winRate: 35,
      totalVolume: 4200,
      streak: 1,
      avatar: "👤",
    },
    {
      rank: 8,
      address: "0x7c8d...9e0f",
      wins: 45,
      losses: 105,
      totalProfit: -320,
      winRate: 30,
      totalVolume: 3500,
      streak: 0,
      avatar: "👤",
    },
    {
      rank: 9,
      address: "0x2b3c...4d5e",
      wins: 38,
      losses: 112,
      totalProfit: -580,
      winRate: 25,
      totalVolume: 2800,
      streak: 0,
      avatar: "👤",
    },
    {
      rank: 10,
      address: "0x6f7a...8b9c",
      wins: 31,
      losses: 119,
      totalProfit: -840,
      winRate: 21,
      totalVolume: 2100,
      streak: 0,
      avatar: "👤",
    },
  ])

  const [timeframe, setTimeframe] = useState<"all" | "month" | "week">("all")
  const [filter, setFilter] = useState<"profit" | "wins" | "streak">("profit")

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (filter === "profit") return b.totalProfit - a.totalProfit
    if (filter === "wins") return b.wins - a.wins
    return b.streak - a.streak
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground">Top performers ranked by {filter === "profit" ? "total profit" : filter === "wins" ? "total wins" : "current win streak"}</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setTimeframe("week")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeframe === "week"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeframe("month")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeframe === "month"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeframe("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeframe === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              All Time
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("profit")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "profit"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              By Profit
            </button>
            <button
              onClick={() => setFilter("wins")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "wins"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              By Wins
            </button>
            <button
              onClick={() => setFilter("streak")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "streak"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              By Streak
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Player</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Wins</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Win Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total Profit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Volume</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedLeaderboard.map((user) => (
                  <tr
                    key={user.address}
                    className={`hover:bg-secondary/50 transition-colors ${user.rank <= 3 ? "bg-secondary/30" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{user.avatar}</span>
                        <span className="font-bold text-lg text-primary">#{user.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.address}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {user.wins}
                      <span className="text-muted-foreground ml-1">W / {user.losses} L</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${user.winRate}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-foreground">{user.winRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-semibold ${user.totalProfit > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {user.totalProfit > 0 ? "+" : ""}${user.totalProfit.toLocaleString()} SMN
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {user.totalVolume >= 1000 ? `${(user.totalVolume / 1000).toFixed(1)}k` : user.totalVolume} SMN
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">{user.streak}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
