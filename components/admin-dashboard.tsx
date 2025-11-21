"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, TrendingUp, Users } from "lucide-react"

interface AdminMarket {
  id: number
  title: string
  category: string
  yesPool: number
  noPool: number
  totalBets: number
  status: "active" | "resolved" | "pending"
  outcome?: boolean
}

interface AdminDashboardProps {
  walletAddress?: string
}

export default function AdminDashboard({ walletAddress }: AdminDashboardProps) {
  const [markets, setMarkets] = useState<AdminMarket[]>([
    {
      id: 1,
      title: "Bitcoin over $50k by Dec 31?",
      category: "Crypto",
      yesPool: 15000,
      noPool: 12000,
      totalBets: 42,
      status: "active",
    },
    {
      id: 2,
      title: "Ethereum Price > Ethereum Price?",
      category: "Crypto",
      yesPool: 8000,
      noPool: 9500,
      totalBets: 28,
      status: "active",
    },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "Crypto",
  })

  const handleCreateMarket = (e: React.FormEvent) => {
    e.preventDefault()
    const newMarket: AdminMarket = {
      id: markets.length + 1,
      title: formData.title,
      category: formData.category,
      yesPool: 0,
      noPool: 0,
      totalBets: 0,
      status: "pending",
    }
    setMarkets([...markets, newMarket])
    setFormData({ title: "", category: "Crypto" })
    setShowCreateModal(false)
  }

  const handleResolveMarket = (id: number, outcome: boolean) => {
    setMarkets(markets.map((m) => (m.id === id ? { ...m, status: "resolved", outcome } : m)))
  }

  const handleDeleteMarket = (id: number) => {
    setMarkets(markets.filter((m) => m.id !== id))
  }

  const totalVolume = markets.reduce((sum, m) => sum + m.yesPool + m.noPool, 0)
  const totalUsers = markets.reduce((sum, m) => sum + m.totalBets, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage prediction markets and oversee platform activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Markets</p>
                <p className="text-3xl font-bold text-foreground mt-1">{markets.length}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-primary" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-3xl font-bold text-foreground mt-1">${(totalVolume / 1000).toFixed(1)}k</p>
              </div>
              <TrendingUp className="w-10 h-10 text-primary" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bets</p>
                <p className="text-3xl font-bold text-foreground mt-1">{totalUsers}</p>
              </div>
              <Users className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>

        {/* Create Market Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New Market
          </button>
        </div>

        {/* Markets Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Market Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Yes Pool</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">No Pool</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Bets</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {markets.map((market) => (
                  <tr key={market.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground">{market.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{market.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-primary">${market.yesPool}</td>
                    <td className="px-6 py-4 text-sm font-medium text-primary">${market.noPool}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{market.totalBets}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          market.status === "active"
                            ? "bg-green-100 text-green-700"
                            : market.status === "resolved"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {market.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      {market.status === "active" && (
                        <>
                          <button
                            onClick={() => handleResolveMarket(market.id, true)}
                            className="text-primary hover:text-primary/70 text-xs font-medium"
                          >
                            Resolve YES
                          </button>
                          <button
                            onClick={() => handleResolveMarket(market.id, false)}
                            className="text-primary hover:text-primary/70 text-xs font-medium"
                          >
                            Resolve NO
                          </button>
                        </>
                      )}
                      <button onClick={() => handleDeleteMarket(market.id)}>
                        <Trash2 className="w-4 h-4 text-destructive hover:text-destructive/70" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Market Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-foreground mb-4">Create New Market</h2>
            <form onSubmit={handleCreateMarket} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Market Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2 text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Bitcoin over $50k by Dec 31?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2 text-foreground bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Crypto</option>
                  <option>Sports</option>
                  <option>Weather</option>
                  <option>Economics</option>
                  <option>Entertainment</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-border text-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Create Market
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
