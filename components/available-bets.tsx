"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface Bet {
  id: string
  title: string
  description: string
  status: "OPEN" | "CLOSED" | "SETTLED"
  odds: { up: number; down: number }
  volume: number
  expiresIn: string
  category: string
  currentPrice?: number
  priceChange?: number
}

interface AvailableBetsProps {
  onSelectBet: (bet: Bet) => void
}

const getMockBets = (): Bet[] => [
  {
    id: "1",
    title: "BTC/USD Price Up in 30s",
    description: "Bitcoin will trade above $93,500 in the next 30 seconds",
    status: "OPEN",
    odds: { up: 1.95, down: 2.05 },
    volume: 450000,
    expiresIn: "0:00:30",
    category: "Crypto",
    currentPrice: 93250 + Math.random() * 500,
    priceChange: 2.1,
  },
  {
    id: "2",
    title: "ETH Crosses $3,500",
    description: "Ethereum will breach the $3,500 mark",
    status: "OPEN",
    odds: { up: 2.1, down: 1.9 },
    volume: 280000,
    expiresIn: "0:05:00",
    category: "Crypto",
    currentPrice: 3450 + Math.random() * 100,
    priceChange: -1.3,
  },
  {
    id: "3",
    title: "SOL Volatility Spike",
    description: "Solana will experience >2% price movement",
    status: "OPEN",
    odds: { up: 1.85, down: 2.15 },
    volume: 125000,
    expiresIn: "0:01:45",
    category: "Crypto",
    currentPrice: 190 + Math.random() * 20,
    priceChange: 3.5,
  },
  {
    id: "4",
    title: "Market Cap Growth",
    description: "Total crypto market cap will grow by 1% today",
    status: "OPEN",
    odds: { up: 2.0, down: 2.0 },
    volume: 890000,
    expiresIn: "24:00:00",
    category: "Market",
    currentPrice: 3200000000000 + Math.random() * 50000000000,
    priceChange: 1.8,
  },
  {
    id: "5",
    title: "XRP Breaks Resistance",
    description: "XRP will break through the $2.50 resistance level",
    status: "OPEN",
    odds: { up: 1.75, down: 2.25 },
    volume: 320000,
    expiresIn: "0:03:15",
    category: "Crypto",
    currentPrice: 2.35 + Math.random() * 0.3,
    priceChange: 4.2,
  },
  {
    id: "6",
    title: "Tech Stock Surge",
    description: "NASDAQ will close up more than 1% today",
    status: "OPEN",
    odds: { up: 2.15, down: 1.85 },
    volume: 650000,
    expiresIn: "6:30:00",
    category: "Market",
    currentPrice: 15420 + Math.random() * 200,
    priceChange: 0.85,
  },
]

export default function AvailableBets({ onSelectBet }: AvailableBetsProps) {
  const [bets, setBets] = useState<Bet[]>(getMockBets())

  useEffect(() => {
    const interval = setInterval(() => {
      setBets((prevBets) =>
        prevBets.map((bet) => ({
          ...bet,
          currentPrice: (bet.currentPrice || 0) + (Math.random() - 0.5) * 100,
          priceChange: (Math.random() - 0.5) * 5,
        })),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {bets.map((bet) => (
          <Card
            key={bet.id}
            className="border-primary/15 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm sm:text-base truncate group-hover:text-primary transition-colors">
                    {bet.title}
                  </CardTitle>
                  <CardDescription className="text-xs mt-1 line-clamp-2">{bet.description}</CardDescription>
                </div>
                <Badge variant="secondary" className="shrink-0 text-xs bg-primary/10 text-primary border-primary/30">
                  {bet.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-primary/5 border border-primary/15 p-3">
                <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                <div className="flex items-center justify-between">
                  <p className="text-base sm:text-lg font-bold text-primary">
                    ${bet.currentPrice?.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </p>
                  <div
                    className={`flex items-center gap-1 text-xs sm:text-sm font-semibold ${bet.priceChange! >= 0 ? "text-primary" : "text-destructive"}`}
                  >
                    {bet.priceChange! >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(bet.priceChange!).toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-primary/10 border border-primary/20 p-2">
                  <p className="text-xs text-muted-foreground">BUY (UP)</p>
                  <p className="text-base font-bold text-primary">{bet.odds.up.toFixed(2)}x</p>
                </div>
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-2">
                  <p className="text-xs text-muted-foreground">SELL (DOWN)</p>
                  <p className="text-base font-bold text-destructive">{bet.odds.down.toFixed(2)}x</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs border-t border-primary/15 pt-3">
                <div>
                  <p className="text-muted-foreground">Volume</p>
                  <p className="font-semibold text-foreground">${(bet.volume / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expires</p>
                  <p className="font-semibold text-foreground">{bet.expiresIn}</p>
                </div>
              </div>

              <Button
                onClick={() => onSelectBet(bet)}
                className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 font-semibold text-sm"
              >
                Place Bet
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
