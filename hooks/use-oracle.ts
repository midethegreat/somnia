"use client"

import { useState, useEffect } from "react"
import { oracleService } from "@/lib/oracle-service"

interface UseOracleResult {
  priceData: any
  loading: boolean
  error: string | null
}

export function useOracle(asset: string) {
  const [priceData, setPriceData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const data = await oracleService.getPriceData(asset)
        if (data) {
          setPriceData(data)
        }
      } catch (err) {
        setError("Failed to fetch oracle data")
      } finally {
        setLoading(false)
      }
    }

    fetchPrice()
    const interval = setInterval(fetchPrice, 3000)
    return () => clearInterval(interval)
  }, [asset])

  return { priceData, loading, error }
}
