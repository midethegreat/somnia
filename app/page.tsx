"use client"

import { useState, useEffect } from "react"
import WalletConnect from "@/components/wallet-connect"
import Dashboard from "@/components/dashboard"
import Footer from "@/components/footer"

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress")
    const savedConnected = localStorage.getItem("isConnected")

    if (savedAddress && savedConnected === "true") {
      setWalletAddress(savedAddress)
      setIsConnected(true)
    }
    setIsLoading(false)
  }, [])

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    setIsConnected(true)
    localStorage.setItem("walletAddress", address)
    localStorage.setItem("isConnected", "true")
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWalletAddress("")
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("isConnected")
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        {!isConnected ? (
          <WalletConnect onConnect={handleWalletConnect} />
        ) : (
          <Dashboard walletAddress={walletAddress} onDisconnect={handleDisconnect} />
        )}
      </div>
      <Footer />
    </main>
  )
}
