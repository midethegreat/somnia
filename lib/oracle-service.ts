interface OraclePrice {
  asset: string
  price: number
  timestamp: number
  source: string
}

interface OracleOutcome {
  marketId: number
  resolved: boolean
  outcome?: boolean
  resolvedAt?: number
  confidence: number
}

export class OracleService {
  private oracleEndpoint: string

  constructor(endpoint = "https://oracle.somnia.network") {
    this.oracleEndpoint = endpoint
  }

  async getPriceData(asset: string): Promise<OraclePrice | null> {
    try {
      const response = await fetch(`${this.oracleEndpoint}/price/${asset}`)
      if (!response.ok) return null
      return await response.json()
    } catch (error) {
      console.error("Error fetching oracle price:", error)
      return null
    }
  }

  async resolveMarketOutcome(
    marketId: number,
    marketData: {
      title: string
      category: string
      createdAt: number
    },
  ): Promise<OracleOutcome> {
    try {
      // Parse market title to extract resolution condition
      const outcome = await this.determineOutcome(marketData)

      return {
        marketId,
        resolved: true,
        outcome,
        resolvedAt: Date.now(),
        confidence: 0.95,
      }
    } catch (error) {
      console.error("Error resolving market:", error)
      return {
        marketId,
        resolved: false,
        confidence: 0,
      }
    }
  }

  private async determineOutcome(marketData: any): Promise<boolean> {
    // Logic to determine YES/NO outcome based on market parameters
    // This would integrate with external data sources
    return Math.random() > 0.5
  }

  // Get historical price data for trend analysis
  async getHistoricalPrices(asset: string, days: number): Promise<OraclePrice[]> {
    try {
      const response = await fetch(`${this.oracleEndpoint}/historical/${asset}?days=${days}`)
      if (!response.ok) return []
      return await response.json()
    } catch (error) {
      console.error("Error fetching historical prices:", error)
      return []
    }
  }
}

export const oracleService = new OracleService()
