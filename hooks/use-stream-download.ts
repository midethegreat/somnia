"use client"

import { useState } from "react"
import { SDK, SchemaEncoder } from "@somnia-chain/streams"
import type { Hex } from "viem"
import { BET_SCHEMA } from "@/lib/somnia-sdk"

export interface StreamDataItem {
  timestamp: number | string
  betType: "UP" | "DOWN"
  amount: string
  odds: string
  betId: string
  marketId: string
  rawData?: any
}

interface SchemaItem {
  name: string
  value: string | number
  type: string
}

export function useStreamDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const downloadStreamData = async (
    sdk: SDK | null,
    schemaId: Hex,
    publisherAddress: Hex,
    filename: string = "somnia-stream-data.json"
  ) => {
    if (!sdk) {
      setError("SDK not initialized")
      return
    }

    setIsDownloading(true)
    setError(null)

    try {
      const rawData: any = await sdk.streams.getAllPublisherDataForSchema(
        schemaId,
        publisherAddress
      )

      const decoder = new SchemaEncoder(BET_SCHEMA)
      const decodedData: StreamDataItem[] = []

      if (rawData && Array.isArray(rawData)) {
        for (const item of rawData) {
          try {
            const decoded: any = decoder.decodeData(item.data)
            
            const timestampItem = decoded.find((d: any) => d.name === "timestamp")
            const betTypeItem = decoded.find((d: any) => d.name === "betType")
            const amountItem = decoded.find((d: any) => d.name === "amount")
            const oddsItem = decoded.find((d: any) => d.name === "odds")
            const betIdItem = decoded.find((d: any) => d.name === "betId")
            const marketIdItem = decoded.find((d: any) => d.name === "marketId")
            
            const decodedItem: StreamDataItem = {
              timestamp: timestampItem?.value || 0,
              betType: String(betTypeItem?.value) === "0" ? "UP" : "DOWN",
              amount: String(amountItem?.value || "0"),
              odds: String(oddsItem?.value || "0"),
              betId: String(betIdItem?.value || ""),
              marketId: String(marketIdItem?.value || ""),
              rawData: item,
            }
            
            decodedData.push(decodedItem)
          } catch (decodeError) {
            console.warn("Failed to decode item:", decodeError)
          }
        }
      }

      const jsonData = {
        exportDate: new Date().toISOString(),
        publisherAddress,
        schemaId,
        schema: BET_SCHEMA,
        totalRecords: decodedData.length,
        data: decodedData,
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

      setIsDownloading(false)
      return decodedData.length
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to download stream data"
      setError(errorMessage)
      setIsDownloading(false)
      throw err
    }
  }

  return {
    downloadStreamData,
    isDownloading,
    error,
  }
}
