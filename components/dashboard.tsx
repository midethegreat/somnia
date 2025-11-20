"use client"

import { useState } from "react"
import Navbar from "./navbar"
import AvailableBets from "./available-bets"
import BetHistoryModal from "./bet-history-modal"
import BettingInterface from "./betting-interface"

interface DashboardProps {
  onDisconnect: () => void
  walletAddress?: string
}

export default function Dashboard({ onDisconnect, walletAddress }: DashboardProps) {
  const [selectedBet, setSelectedBet] = useState<any>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [activeView, setActiveView] = useState<"markets" | "place-bet">("markets")

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar walletAddress={walletAddress} onHistoryClick={() => setShowHistory(true)} onDisconnect={onDisconnect} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section - Changed from "Welcome, Trader" to "Welcome Dev Mide" */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">Welcome, Dev Mide</h2>
          <p className="text-sm text-muted-foreground mt-2">
            {walletAddress
              ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : "Connected to Somnia Testnet"}
          </p>
        </div>

        {/* Markets or Place Bet Section */}
        {activeView === "markets" ? (
          <AvailableBets
            onSelectBet={(bet) => {
              setSelectedBet(bet)
              setActiveView("place-bet")
            }}
          />
        ) : (
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
      </main>

      {showHistory && <BetHistoryModal onClose={() => setShowHistory(false)} />}
    </div>
  )
}
