"use client"

import { useEffect, useState } from "react"
import { requestWalletConnection, getConnectedAccounts, onAccountsChanged } from "@/lib/viem-client"

/**
 * Hook to manage wallet connection state and account changes
 */
export function useWallet() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      try {
        const accounts = await getConnectedAccounts()
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
        }
      } catch (err) {
        console.error("Error checking wallet connection:", err)
      }
    }

    checkConnection()

    // Listen for account changes
    const unsubscribe = onAccountsChanged((accounts: any) => {
      if (accounts.length > 0) {
        setAccount(accounts[0])
        setIsConnected(true)
      } else {
        setAccount(null)
        setIsConnected(false)
      }
    })

    return () => unsubscribe?.()
  }, [])

  const connect = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const address = await requestWalletConnection()
      setAccount(address)
      setIsConnected(true)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to connect wallet")
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setIsConnected(false)
  }

  return { account, isConnected, isLoading, error, connect, disconnect }
}
