"use client"

import { useEffect, useState } from "react"
import { type SDK, SchemaEncoder } from "@somnia-chain/streams"
import { createPublicClient, createWalletClient, http, type Hex } from "viem"
import { initializeSDK, BET_SCHEMA, computeBetSchemaId } from "@/lib/somnia-sdk"
import { somniaTestnet } from "@/lib/somnia-chain"

/**
 * Hook to initialize and manage Somnia SDK instance
 */
export function useSomniaSDK() {
  const [sdk, setSDK] = useState<SDK | null>(null)
  const [schemaId, setSchemaId] = useState<Hex | null>(null)
  const [schemaEncoder, setSchemaEncoder] = useState<SchemaEncoder | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initializeSDKInstance = async () => {
      try {
        // Create viem clients
        const publicClient = createPublicClient({
          chain: somniaTestnet,
          transport: http(),
        })

        const walletClient = createWalletClient({
          chain: somniaTestnet,
          transport: http(),
        })

        // Initialize SDK
        const sdkInstance = initializeSDK(publicClient, walletClient)
        setSDK(sdkInstance)

        // Compute schema ID
        const computedSchemaId = await computeBetSchemaId(sdkInstance)
        setSchemaId(computedSchemaId)

        // Create schema encoder
        const encoder = new SchemaEncoder(BET_SCHEMA)
        setSchemaEncoder(encoder)

        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to initialize SDK"))
        setIsLoading(false)
      }
    }

    initializeSDKInstance()
  }, [])

  return { sdk, schemaId, schemaEncoder, isLoading, error }
}
