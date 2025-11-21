import type { SomniaSDK } from "@somnia-chain/streams"

interface BetSettlement {
  betId: number
  marketId: number
  bettor: string
  position: boolean
  amount: number
  payout: number
  settled: boolean
  timestamp: number
}

export async function recordSettlement(sdk: SomniaSDK, settlement: BetSettlement) {
  try {
    const schema = {
      fields: [
        { name: "betId", type: "uint64" },
        { name: "marketId", type: "uint64" },
        { name: "settled", type: "uint8" },
        { name: "payout", type: "uint256" },
      ],
    }

    const data = {
      betId: settlement.betId,
      marketId: settlement.marketId,
      settled: settlement.settled ? 1 : 0,
      payout: settlement.payout,
    }

    await sdk.streams.set(`settlement-${settlement.betId}`, Buffer.from(JSON.stringify(data)), schema)

    return true
  } catch (error) {
    console.error("Error recording settlement:", error)
    return false
  }
}

export async function calculatePayout(betAmount: number, betOdds: number, won: boolean): Promise<number> {
  if (!won) return 0
  return betAmount + (betAmount * (betOdds - 100)) / 100
}
