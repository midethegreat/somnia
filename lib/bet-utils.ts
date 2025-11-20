import type { Hex } from "viem"

/**
 * Bet history item interface
 */
export interface BetHistoryItem {
  id: string
  title: string
  marketId: string
  betType: "UP" | "DOWN"
  amount: number
  odds: number
  result: "WIN" | "LOSS" | "PENDING"
  payout: number
  timestamp: string
  transactionHash?: Hex
}

/**
 * Market interface for available bets
 */
export interface Market {
  id: string
  title: string
  description: string
  category: string
  currentPrice: number
  volume: number
  odds: {
    up: number
    down: number
  }
  expiresAt: string
  liquidity: number
}

/**
 * Calculate potential payout from bet
 */
export function calculatePayout(amount: number, odds: number): number {
  return amount * odds
}

/**
 * Calculate profit/loss
 */
export function calculateProfit(payout: number, amount: number): number {
  return payout - amount
}

/**
 * Generate unique bet ID
 */
export function generateBetId(): Hex {
  const randomBytes = Math.random().toString(16).slice(2)
  return `0x${randomBytes}`.padEnd(66, "0") as Hex
}

/**
 * Format wallet address
 */
export function formatAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

/**
 * Calculate win rate from bet history
 */
export function calculateWinRate(history: BetHistoryItem[]): number {
  const completedBets = history.filter((b) => b.result !== "PENDING")
  if (completedBets.length === 0) return 0
  const wins = completedBets.filter((b) => b.result === "WIN").length
  return (wins / completedBets.length) * 100
}

/**
 * Calculate total staked
 */
export function calculateTotalStaked(history: BetHistoryItem[]): number {
  return history.reduce((sum, bet) => sum + bet.amount, 0)
}

/**
 * Calculate total payout
 */
export function calculateTotalPayout(history: BetHistoryItem[]): number {
  return history.reduce((sum, bet) => sum + bet.payout, 0)
}

/**
 * Group bets by status
 */
export function groupBetsByStatus(history: BetHistoryItem[]) {
  return {
    all: history,
    wins: history.filter((b) => b.result === "WIN"),
    losses: history.filter((b) => b.result === "LOSS"),
    pending: history.filter((b) => b.result === "PENDING"),
  }
}
