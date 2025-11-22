"use client"

import { useState } from "react"
import Navbar from "./navbar"
import AvailableBets from "./available-bets"
import BetHistoryModal from "./bet-history-modal"
import BettingInterface from "./betting-interface"
import AdminDashboard from "./admin-dashboard"
import Leaderboard from "./leaderboard"
import UserStats from "./user-stats"
import { SomniaButton } from "./somnia-button"

interface DashboardProps {
  onDisconnect: () => void
  walletAddress?: string
}

export default function Dashboard({ onDisconnect, walletAddress }: DashboardProps) {
  const [selectedBet, setSelectedBet] = useState<any>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [activeView, setActiveView] = useState<"markets" | "place-bet" | "admin" | "leaderboard" | "stats">("markets")

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar with navigation */}
      <Navbar
        walletAddress={walletAddress}
        onHistoryClick={() => setShowHistory(true)}
        onDisconnect={onDisconnect}
        onNavigate={(page) => {
          if (page === "markets") setActiveView("markets")
          if (page === "leaderboard") setActiveView("leaderboard")
          if (page === "stats") setActiveView("stats")
        }}
        currentPage={activeView === "place-bet" ? "markets" : activeView}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Markets or Place Bet Section */}
        {activeView === "markets" && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Welcome, Dev Mide</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {walletAddress
                    ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                    : "Connected to Somnia Testnet"}
                </p>
              </div>
              <div className="flex gap-2">
                <SomniaButton eventId="live-bets" variant="outline" />
              </div>
            </div>

            <AvailableBets
              onSelectBet={(bet) => {
                setSelectedBet(bet)
                setActiveView("place-bet")
              }}
            />
          </>
        )}

        {activeView === "place-bet" && (
          <div className="space-y-4">
            <button
              onClick={() => setActiveView("markets")}
              className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-2"
            >
              ← Back to Markets
            </button>
            <BettingInterface selectedBet={selectedBet} />
          </div>
        )}

        {activeView === "leaderboard" && <Leaderboard />}

        {activeView === "stats" && <UserStats walletAddress={walletAddress} />}

        {activeView === "admin" && (
          <div className="space-y-4">
            <button
              onClick={() => setActiveView("markets")}
              className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-2"
            >
              ← Back to Markets
            </button>
            <AdminDashboard walletAddress={walletAddress} />
          </div>
        )}
      </main>

      {showHistory && <BetHistoryModal onClose={() => setShowHistory(false)} />}
    </div>
  )
}
