"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface WalletConnectProps {
  onConnect: (address: string) => void
}

interface DetectedWallet {
  name: string
  icon: string
  installed: boolean
  provider?: any
  isPreferred?: boolean
}

declare global {
  interface Window {
    ethereum?: any
    trustwallet?: any
    coinbaseWalletExtension?: any
  }
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [connecting, setConnecting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [wallets, setWallets] = useState<DetectedWallet[]>([])

  useEffect(() => {
    const detectWallets = () => {
      const metaMaskProvider = window.ethereum?.isMetaMask ? window.ethereum : null
      const coinbaseProvider = window.ethereum?.isCoinbaseWallet ? window.ethereum : null
      const trustWalletProvider = window.ethereum?.isTrustWallet ? window.ethereum : null

      const detectedWallets: DetectedWallet[] = [
        {
          name: "MetaMask",
          icon: "🦊",
          installed: !!metaMaskProvider,
          provider: metaMaskProvider,
          isPreferred: true,
        },
        {
          name: "Coinbase Wallet",
          icon: "💙",
          installed: !!coinbaseProvider,
          provider: coinbaseProvider,
        },
        {
          name: "Trust Wallet",
          icon: "🛡️",
          installed: !!trustWalletProvider,
          provider: trustWalletProvider,
        },
        {
          name: "WalletConnect",
          icon: "🔗",
          installed: true, // WalletConnect is always available via web
          provider: null,
        },
      ]

      setWallets(detectedWallets)
    }

    detectWallets()
    const timer = setTimeout(detectWallets, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleConnect = async (walletName: string) => {
    setConnecting(walletName)
    setError(null)

    try {
      if (walletName === "WalletConnect") {
        window.location.href = "https://web3modal.com/"
        return
      }

      const wallet = wallets.find((w) => w.name === walletName)

      if (!wallet?.installed) {
        setError(`${walletName} is not installed. Please install it first.`)
        setConnecting(null)
        return
      }

      if (!wallet?.provider) {
        setError(`${walletName} provider not found.`)
        setConnecting(null)
        return
      }

      const accounts = await wallet.provider.request({
        method: "eth_requestAccounts",
      })

      if (accounts && accounts.length > 0) {
        onConnect(accounts[0])
      }
    } catch (err: any) {
      setError(err.message || `Failed to connect to ${walletName}`)
      setConnecting(null)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center p-4">
      <Card className="w-full max-w-md border border-primary/20 shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/50 flex items-center justify-center neon-glow text-2xl">
              ◆
            </div>
          </div>
          <CardTitle className="text-3xl neon-glow">Connect Wallet</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">Choose your wallet to start trading</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          {wallets.length > 0 ? (
            wallets.map((wallet) => (
              <Button
                key={wallet.name}
                onClick={() => handleConnect(wallet.name)}
                disabled={connecting !== null || (!wallet.installed && wallet.name !== "WalletConnect")}
                className={`w-full h-12 sm:h-14 border border-primary/30 text-foreground hover:bg-primary/5 hover:border-primary/60 hover:text-primary transition-all duration-300`}
                variant="outline"
              >
                <span className="text-xl">{wallet.icon}</span>
                <span className="ml-3 flex-1 text-left font-medium text-sm sm:text-base">
                  {wallet.name}
                  {wallet.isPreferred && wallet.installed && " (preferred)"}
                </span>
                {connecting === wallet.name && <span className="text-xs text-primary">Connecting...</span>}
              </Button>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground text-sm mb-4">Loading wallets...</p>
            </div>
          )}
          <div className="pt-4 space-y-2 border-t border-primary/10">
            <p className="text-center text-xs text-muted-foreground">Don't have a wallet?</p>
            <div className="flex gap-2">
              <a
                href="https://metamask.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-primary hover:underline text-xs font-medium text-center"
              >
                Install MetaMask
              </a>
              <a
                href="https://trustwallet.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-primary hover:underline text-xs font-medium text-center"
              >
                Install Trust
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground pt-2">🔗 Somnia Testnet Network Required</p>
        </CardContent>
      </Card>
    </div>
  )
}
