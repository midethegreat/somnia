// Automated Market Maker (AMM) implementation for dynamic odds

interface LiquidityPool {
  marketId: number
  yesReserve: number
  noReserve: number
  k: number // Constant product invariant
  totalLiquidity: number
}

export class AMMEngine {
  private pools: Map<number, LiquidityPool> = new Map()

  initializePool(marketId: number, initialAmount = 10000) {
    const pool: LiquidityPool = {
      marketId,
      yesReserve: initialAmount,
      noReserve: initialAmount,
      k: initialAmount * initialAmount,
      totalLiquidity: initialAmount * 2,
    }
    this.pools.set(marketId, pool)
    return pool
  }

  calculateSwapOutput(marketId: number, inputAmount: number, isYes: boolean): number {
    const pool = this.pools.get(marketId)
    if (!pool) return 0

    const inputReserve = isYes ? pool.yesReserve : pool.noReserve
    const outputReserve = isYes ? pool.noReserve : pool.yesReserve

    // x * y = k formula
    const newInputReserve = inputReserve + inputAmount
    const newOutputReserve = pool.k / newInputReserve
    const outputAmount = outputReserve - newOutputReserve

    return outputAmount
  }

  calculateOdds(marketId: number): { yesOdds: number; noOdds: number } {
    const pool = this.pools.get(marketId)
    if (!pool) return { yesOdds: 1, noOdds: 1 }

    const yesOdds = pool.noReserve / pool.yesReserve
    const noOdds = pool.yesReserve / pool.noReserve

    return { yesOdds, noOdds }
  }

  executeBet(
    marketId: number,
    betAmount: number,
    isYes: boolean,
  ): { outputAmount: number; newOdds: { yesOdds: number; noOdds: number } } {
    const pool = this.pools.get(marketId)
    if (!pool) return { outputAmount: 0, newOdds: { yesOdds: 1, noOdds: 1 } }

    const outputAmount = this.calculateSwapOutput(marketId, betAmount, isYes)

    // Update reserves
    if (isYes) {
      pool.yesReserve += betAmount
      pool.noReserve -= outputAmount
    } else {
      pool.noReserve += betAmount
      pool.yesReserve -= outputAmount
    }

    const newOdds = this.calculateOdds(marketId)

    return { outputAmount, newOdds }
  }

  addLiquidity(marketId: number, yesAmount: number, noAmount: number): number {
    const pool = this.pools.get(marketId)
    if (!pool) return 0

    const lpTokens = Math.min(yesAmount, noAmount) / Math.sqrt((pool.yesReserve * pool.noReserve) / pool.totalLiquidity)

    pool.yesReserve += yesAmount
    pool.noReserve += noAmount
    pool.totalLiquidity += yesAmount + noAmount
    pool.k = pool.yesReserve * pool.noReserve

    return lpTokens
  }

  removeLiquidity(
    marketId: number,
    lpTokens: number,
  ): {
    yesAmount: number
    noAmount: number
  } {
    const pool = this.pools.get(marketId)
    if (!pool) return { yesAmount: 0, noAmount: 0 }

    const share = lpTokens / pool.totalLiquidity
    const yesAmount = pool.yesReserve * share
    const noAmount = pool.noReserve * share

    pool.yesReserve -= yesAmount
    pool.noReserve -= noAmount
    pool.totalLiquidity -= lpTokens

    return { yesAmount, noAmount }
  }

  getPoolState(marketId: number): LiquidityPool | undefined {
    return this.pools.get(marketId)
  }
}

export const ammEngine = new AMMEngine()
