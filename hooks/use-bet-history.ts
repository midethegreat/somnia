"use client"

import { useState, useEffect } from "react"
import { useSomniaSDK } from "./use-somnia-sdk"
import type { Hex } from "viem"

export interface BetHistoryItem {
  timestamp: number | string
  betType: "UP" | "DOWN"
  amount: string
  odds: string
  betId: string
  marketId: string
}

export function useBetHistory(walletAddress?: string) {
  const { sdk, schemaId, schemaEncoder, isLoading: sdkLoading, error: sdkError } = useSomniaSDK()
  const [bets, setBets] = useState<BetHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBets = async () => {
      if (!sdk || !schemaId || !schemaEncoder || !walletAddress) {
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const rawData: any = await sdk.streams.getAllPublisherDataForSchema(
          schemaId,
          walletAddress as Hex
        )

        const decodedBets: BetHistoryItem[] = []

        if (rawData && Array.isArray(rawData)) {
          for (const item of rawData) {
            try {
              if (!item || !item.data) {
                console.warn("Skipping malformed item:", item)
                continue
              }

              const decoded: any = schemaEncoder.decodeData(item.data)

              const timestampItem = decoded.find((d: any) => d.name === "timestamp")
              const betTypeItem = decoded.find((d: any) => d.name === "betType")
              const amountItem = decoded.find((d: any) => d.name === "amount")
              const oddsItem = decoded.find((d: any) => d.name === "odds")
              const betIdItem = decoded.find((d: any) => d.name === "betId")
              const marketIdItem = decoded.find((d: any) => d.name === "marketId")

              decodedBets.push({
                timestamp: timestampItem?.value || 0,
                betType: String(betTypeItem?.value) === "0" ? "UP" : "DOWN",
                amount: String(amountItem?.value || "0"),
                odds: String(oddsItem?.value || "0"),
                betId: String(betIdItem?.value || ""),
                marketId: String(marketIdItem?.value || ""),
              })
            } catch (decodeError) {
              console.error("Failed to decode bet:", decodeError)
              setError("Some bets could not be decoded")
            }
          }
        }

        setBets(decodedBets)
        setIsLoading(false)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch bet history"
        setError(errorMessage)
        setIsLoading(false)
        console.error("Error fetching bets:", err)
      }
    }

    fetchBets()
  }, [sdk, schemaId, schemaEncoder, walletAddress])

  const downloadAsJSON = (filename: string = "somnia-bets.json") => {
    const jsonData = {
      exportDate: new Date().toISOString(),
      walletAddress,
      schema: "uint64 timestamp, uint8 betType, uint256 amount, uint256 odds, bytes32 betId, bytes32 marketId",
      totalRecords: bets.length,
      bets,
    }

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return {
    bets,
    isLoading: sdkLoading || isLoading,
    error: sdkError?.message || error,
    downloadAsJSON,
  }
}
