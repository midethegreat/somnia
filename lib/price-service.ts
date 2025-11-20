/**
 * Service to fetch and cache market prices
 * Can be extended to integrate with real price APIs
 */

import { subscribeToLivePrice, fetchMarketPrices, type MarketPrice } from "./market-prices"

class PriceService {
  private priceCache: Map<string, MarketPrice> = new Map()
  private subscriptions: Map<string, () => void> = new Map()

  /**
   * Get cached price or fetch new one
   */
  async getPrice(symbol: string): Promise<MarketPrice | null> {
    if (this.priceCache.has(symbol)) {
      return this.priceCache.get(symbol) || null
    }

    const prices = await fetchMarketPrices([symbol])
    if (prices.length > 0) {
      this.priceCache.set(symbol, prices[0])
      return prices[0]
    }

    return null
  }

  /**
   * Subscribe to live price updates
   */
  subscribeLivePrice(symbol: string, callback: (price: MarketPrice) => void): () => void {
    // Unsubscribe from previous subscription if exists
    if (this.subscriptions.has(symbol)) {
      this.subscriptions.get(symbol)?.()
    }

    // Subscribe to new price updates
    const unsubscribe = subscribeToLivePrice(symbol, (price) => {
      this.priceCache.set(symbol, price)
      callback(price)
    })

    this.subscriptions.set(symbol, unsubscribe)
    return unsubscribe
  }

  /**
   * Unsubscribe from price updates
   */
  unsubscribeLivePrice(symbol: string): void {
    if (this.subscriptions.has(symbol)) {
      this.subscriptions.get(symbol)?.()
      this.subscriptions.delete(symbol)
    }
  }

  /**
   * Clear all subscriptions
   */
  clearAllSubscriptions(): void {
    this.subscriptions.forEach((unsubscribe) => unsubscribe())
    this.subscriptions.clear()
  }
}

// Export singleton instance
export const priceService = new PriceService()
