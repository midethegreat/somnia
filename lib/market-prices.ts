/**
 * Mock live price data fetching
 * In production, integrate with CoinGecko, Binance API, or other price feeds
 */

export interface MarketPrice {
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
}

const mockPrices: Record<string, MarketPrice> = {
  BTC: {
    symbol: "BTC",
    price: 42500,
    change24h: 2.5,
    marketCap: 835000000000,
    volume24h: 28000000000,
  },
  ETH: {
    symbol: "ETH",
    price: 2250,
    change24h: 1.8,
    marketCap: 270000000000,
    volume24h: 12000000000,
  },
  SOL: {
    symbol: "SOL",
    price: 145,
    change24h: 3.2,
    marketCap: 47000000000,
    volume24h: 2500000000,
  },
}

/**
 * Fetch live market prices
 * @param symbols Array of symbols to fetch prices for
 */
export async function fetchMarketPrices(symbols: string[]): Promise<MarketPrice[]> {
  // In production, call real API:
  // const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?...`)
  // return response.json()

  return symbols.map((symbol) => mockPrices[symbol]).filter((price) => price !== undefined)
}

/**
 * Get single market price
 */
export async function getMarketPrice(symbol: string): Promise<MarketPrice | null> {
  const prices = await fetchMarketPrices([symbol])
  return prices.length > 0 ? prices[0] : null
}

/**
 * Simulate live price updates (for demo purposes)
 */
export function subscribeToLivePrice(symbol: string, callback: (price: MarketPrice) => void): () => void {
  const interval = setInterval(() => {
    const basePrice = mockPrices[symbol]
    if (basePrice) {
      const change = (Math.random() - 0.5) * 0.5 // Random fluctuation
      callback({
        ...basePrice,
        price: basePrice.price + change,
        change24h: basePrice.change24h + (Math.random() - 0.5) * 0.2,
      })
    }
  }, 3000) // Update every 3 seconds

  return () => clearInterval(interval)
}
