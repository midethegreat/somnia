"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { ammEngine } from "@/lib/amm-liquidity"

interface LiquidityProviderProps {
  marketId: number
  onLiquidityAdded?: (lpTokens: number) => void
}

export default function LiquidityProvider({ marketId, onLiquidityAdded }: LiquidityProviderProps) {
  const [yesAmount, setYesAmount] = useState(100)
  const [noAmount, setNoAmount] = useState(100)
  const [isAdding, setIsAdding] = useState(true)

  const pool = ammEngine.getPoolState(marketId)

  const handleAddLiquidity = () => {
    const lpTokens = ammEngine.addLiquidity(marketId, yesAmount, noAmount)
    onLiquidityAdded?.(lpTokens)
    setYesAmount(100)
    setNoAmount(100)
  }

  const handleRemoveLiquidity = () => {
    const { yesAmount: returnedYes, noAmount: returnedNo } = ammEngine.removeLiquidity(marketId, yesAmount)
    // Handle removal
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Provide Liquidity</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">YES Amount</label>
          <input
            type="number"
            value={yesAmount}
            onChange={(e) => setYesAmount(Number(e.target.value))}
            className="w-full border border-border rounded-lg px-4 py-2 text-foreground bg-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">NO Amount</label>
          <input
            type="number"
            value={noAmount}
            onChange={(e) => setNoAmount(Number(e.target.value))}
            className="w-full border border-border rounded-lg px-4 py-2 text-foreground bg-input"
          />
        </div>

        {pool && (
          <div className="bg-secondary p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              Current Pools: YES {pool.yesReserve.toFixed(0)} / NO {pool.noReserve.toFixed(0)}
            </p>
          </div>
        )}

        <button
          onClick={handleAddLiquidity}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Liquidity
        </button>
      </div>
    </div>
  )
}
